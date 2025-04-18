import { sequelize } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { Place, RoomDetail, StudentRoom, User } from '../models/association.js';

// Hàm service xử lý lấy danh sách các bản ghi Place theo các điều kiện
export const getPlacesService = async (query) => {
  const { level, parent_id, search, page, limit, gender, status } = query;

  if (!level) {
    throw { status: 404, message: 'level of place is required' };
  }

  if (level === 'area') {
    if (parent_id && parent_id !== 'null') {
      throw { status: 404, message: 'For level area, parent_id must be null' };
    }
    const areas = await Place.findAll({
      where: { level: 'area' },
    });
    return areas;
  }

  if (level === 'floor') {
    if (!parent_id) {
      throw {
        status: 404,
        message: 'For level floor, parent_id is required for level floor',
      };
    }
    const floors = await Place.findAll({
      where: { level: 'floor', parent_id },
    });
    return floors;
  }

  if (level === 'room') {
    if (!parent_id) {
      throw { status: 404, message: 'For level room, parent_id is required' };
    }

    const pageNum = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const offset = (pageNum - 1) * pageSize;

    let roomWhere = { level: 'room' };
    if (search) {
      roomWhere = {
        ...roomWhere,
        [Op.or]: [
          { area_name: { [Op.eq]: search } },
          { '$room_detail.room_number$': { [Op.eq]: search } },
        ],
      };
    }

    const roomDetailFilter = {};
    if (gender) {
      roomDetailFilter.gender = gender;
    }
    if (status) {
      roomDetailFilter.status = status;
    }

    const parentRecord = await Place.findOne({ where: { id: parent_id } });
    if (!parentRecord) {
      throw { status: 404, message: 'Parent record not found' };
    }

    let includeArray = [
      {
        model: RoomDetail,
        as: 'room_detail',
        required: true,
        where:
          Object.keys(roomDetailFilter).length > 0
            ? roomDetailFilter
            : undefined,
      },
    ];

    if (parentRecord.level === 'area') {
      const floors = await Place.findAll({
        where: { level: 'floor', parent_id },
        attributes: ['id'],
      });
      const floorIds = floors.map((floor) => floor.id);
      roomWhere.parent_id = { [Op.in]: floorIds };

      includeArray.unshift({
        model: Place,
        as: 'ParentPlace',
        where: { parent_id },
        attributes: [],
      });
    } else if (parentRecord.level === 'floor') {
      roomWhere.parent_id = parent_id;
    } else {
      throw { status: 404, message: 'Invalid parent record level' };
    }

    const { count, rows } = await Place.findAndCountAll({
      where: roomWhere,
      include: includeArray,
      offset,
      limit: pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);

    return {
      pagination: {
        currentPage: pageNum,
        limit: pageSize,
        totalRecords: count,
        totalPages,
      },
      data: rows,
    };
  }

  throw { status: 404, message: 'Invalid level provided' };
};

export const getPlaceDetailService = async (id) => {
  // Truy vấn chi tiết của record theo id, bao gồm các association cần thiết
  const detail = await Place.findOne({
    where: { id },
    include: [
      // Lấy thông tin của bản ghi cha (ParentPlace).
      // Ví dụ: nếu record là tầng, ParentPlace là khu vực; nếu record là phòng, ParentPlace là tầng.
      {
        model: Place,
        as: 'ParentPlace',
        attributes: ['id', 'area_name', 'level'],
        include: [
          // Với trường hợp phòng, cha của tầng sẽ là khu vực.
          {
            model: Place,
            as: 'ParentPlace',
            attributes: ['id', 'area_name', 'level'],
          },
        ],
      },
      // Nếu record là phòng, include thông tin chi tiết từ RoomDetail
      {
        model: RoomDetail,
        as: 'room_detail',
        required: false,
        include: [
          {
            model: User,
            as: 'leaderUser',
            attributes: [
              'id',
              'first_name',
              'last_name',
              'email',
              'student_code',
              'class_code',
              'gender',
              'nationality',
            ],
          },
        ],
      },
      // Nếu record là phòng, include danh sách các sinh viên (StudentRoom) thuộc phòng đó
      {
        model: StudentRoom,
        as: 'StudentRoom',
        required: false,
        include: [
          {
            model: User,
            as: 'student',
            attributes: [
              'id',
              'first_name',
              'last_name',
              'email',
              'student_code',
              'class_code',
              'gender',
              'nationality',
            ],
          },
        ],
      },
    ],
  });

  return detail;
};
export const createPlaceService = async (data) => {
  const { level } = data;

  if (!level) {
    throw { status: 400, message: 'level is required' };
  }

  if (level === 'area') {
    const { area_name } = data;
    if (!area_name) {
      throw { status: 400, message: 'area_name is required for area' };
    }
    // Tạo khu vực: parent_id null, level area
    const newArea = await Place.create({
      id: uuidv4(),
      area_name,
      parent_id: null,
      level: 'area',
    });
    return { message: 'Add new area success', area: newArea };
  }

  if (level === 'floor') {
    const { floor_name, areaId } = data;
    if (!floor_name || !areaId) {
      throw {
        status: 400,
        message: 'floor_name and areaId are required for floor',
      };
    }
    // Kiểm tra xem khu vực cha tồn tại và có level area
    const area = await Place.findOne({ where: { id: areaId, level: 'area' } });
    if (!area) {
      throw { status: 404, message: 'Area not found' };
    }
    const newFloor = await Place.create({
      id: uuidv4(),
      area_name: floor_name,
      parent_id: areaId,
      level: 'floor',
    });
    return { message: 'Add new floor success', floor: newFloor };
  }

  if (level === 'room') {
    const {
      room_name,
      floorId,
      room_detailcol,
      room_number,
      capacity,
      status,
      leader,
      gender,
    } = data;
    if (!room_name || !floorId) {
      throw {
        status: 400,
        message: 'room_name and floorId are required for room',
      };
    }
    // Kiểm tra tầng cha có tồn tại và có level floor
    const floor = await Place.findOne({
      where: { id: floorId, level: 'floor' },
    });
    if (!floor) {
      throw { status: 404, message: 'Floor not found' };
    }
    const roomId = uuidv4();
    // Tạo bản ghi phòng trong Place
    const newRoom = await Place.create({
      id: roomId,
      area_name: room_name,
      parent_id: floorId,
      level: 'room',
    });
    // Tạo bản ghi chi tiết phòng trong RoomDetail (mối quan hệ 1:1 qua cùng id)
    const newRoomDetail = await RoomDetail.create({
      id: roomId,
      room_detailcol: room_detailcol || null,
      room_number: room_number,
      capacity: capacity || null,
      status: status || null,
      leader: leader || null,
      gender: gender || null,
    });
    return { room: newRoom, roomDetail: newRoomDetail };
  }

  throw { status: 400, message: 'Invalid level provided' };
};

export const updatePlaceService = async (id, data) => {
  const {
    level,
    area_name,
    parent_id,
    room_detailcol,
    room_number,
    capacity,
    status,
    leader,
    gender,
  } = data;

  if (!level) {
    throw { status: 400, message: 'level is required' };
  }

  // Tìm record Place cần cập nhật theo id và level
  const placeRecord = await Place.findOne({
    where: { id, level },
  });
  if (!placeRecord) {
    throw { status: 400, message: `${level} not found with the given id` };
  }

  if (level === 'area') {
    // Với khu vực, parent_id luôn là null.
    const updateArea = await placeRecord.update({
      area_name: area_name || placeRecord.area_name,
      parent_id: null,
    });
    return updateArea;
  } else if (level === 'floor') {
    // Với tầng, nếu có parent_id mới, nó phải thuộc về khu vực (area)
    if (parent_id) {
      const parentArea = await Place.findOne({
        where: { id: parent_id, level: 'area' },
      });
      if (!parentArea) {
        throw { status: 400, message: 'Parent area not found' };
      }
    }
    const updateFloor = await placeRecord.update({
      area_name: area_name || placeRecord.area_name,
      parent_id: parent_id || placeRecord.parent_id,
    });
    return updateFloor;
  } else if (level === 'room') {
    // Với phòng, nếu có parent_id, nó phải thuộc về tầng (floor)
    if (parent_id) {
      const parentFloor = await Place.findOne({
        where: { id: parent_id, level: 'floor' },
      });
      if (!parentFloor) {
        throw { status: 400, message: 'Parent floor not found' };
      }
    }
    const updateRoom = await placeRecord.update({
      area_name: area_name || placeRecord.area_name,
      parent_id: parent_id || placeRecord.parent_id,
    });
    // Tìm record RoomDetail tương ứng (với cùng id)
    const roomDetailRecord = await RoomDetail.findOne({
      where: { id },
    });
    if (!roomDetailRecord) {
      throw { status: 400, message: 'Room detail not found' };
    }
    const updateRoomDetail = await roomDetailRecord.update({
      room_detailcol:
        room_detailcol !== undefined
          ? room_detailcol
          : roomDetailRecord.room_detailcol,
      room_number:
        room_number !== undefined ? room_number : roomDetailRecord.room_number,
      capacity: capacity !== undefined ? capacity : roomDetailRecord.capacity,
      status: status !== undefined ? status : roomDetailRecord.status,
      leader: leader !== undefined ? leader : roomDetailRecord.leader,
      gender: gender !== undefined ? gender : roomDetailRecord.gender,
    });
    return { roomPlace: updateRoom, roomDetail: updateRoomDetail };
  } else {
    throw { status: 400, message: 'Invalid level' };
  }
};

// Cập nhật trạng thái phòng
export const updateRoomStatusAuto = async (roomId) => {
  const room = await RoomDetail.findByPk(roomId);
  if (!room) throw new ApiError(404, 'Không tìm thấy phòng');

  const currentCount = await StudentRoom.count({ where: { room_id: roomId } });

  if (room.capacity) {
    let newStatus = 'notfull';
    if (currentCount >= room.capacity) {
      newStatus = 'full';
    }

    if (room.status !== newStatus) {
      await room.update({ status: newStatus });
    }
  }
};
