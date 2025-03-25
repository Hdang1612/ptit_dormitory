import { sequelize } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { Place, RoomDetail } from '../models/association.js';

const getPlaces = async (req, res) => {
  try {
    const { level, parent_id, search, page, limit, gender, status } = req.query;
    if (!level) {
      return res.status(404).json({ error: 'level of place is required' });
    }
    if (level === 'area') {
      if (parent_id && parent_id !== 'null') {
        return res
          .status(404)
          .json({ error: 'For level area, parent_id must be null' });
      }
      const areas = await Place.findAll({
        where: { level: 'area' },
      });
      return res.status(200).json(areas);
    }
    if (level === 'floor') {
      if (!parent_id) {
        return res.status(404).json({
          error: 'For level floor, parent_id is required for level floor',
        });
      }
      const floors = await Place.findAll({
        where: {
          level: 'floor',
          parent_id: parent_id,
        },
      });
      return res.status(200).json(floors);
    }
    if (level === 'room') {
      if (!parent_id) {
        return res
          .status(404)
          .json({ error: 'For level room, parent_id is required' });
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
        return res.status(404).json({ error: 'Parent record not found' });
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
          where: { level: 'floor', parent_id: parent_id },
          attributes: ['id'],
        });
        const floorIds = floors.map((floor) => floor.id);
        roomWhere.parent_id = { [Op.in]: floorIds };
        includeArray.unshift({
          model: Place,
          as: 'ParentPlace',
          where: { parent_id },
          attributes: [], // Ẩn thông tin tầng
        });
      } else if (parentRecord.level === 'floor') {
        roomWhere.parent_id = parent_id;
      } else {
        return res.status(404).json({ error: 'Invalid parent record level' });
      }
      const { count, rows } = await Place.findAndCountAll({
        where: roomWhere,
        include: includeArray,
        offset,
        limit: pageSize,
      });
      const totalPages = Math.ceil(count / pageSize);
      return res.status(200).json({
        pagination: {
          currentPage: pageNum,
          limit: pageSize,
          totalRecords: count,
          totalPages: totalPages,
        },
        data: rows,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const getPlaceDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const placeDetail = await Place.findOne({
      where: { id },
      include: [
        // Nếu record có cha, lấy ParentPlace (ví dụ: với tầng, ParentPlace là khu vực; với phòng, ParentPlace là tầng)
        {
          model: Place,
          as: 'ParentPlace',
          attributes: ['id', 'area_name', 'level'],
          include: [
            // Với trường hợp phòng, ParentPlace của ParentPlace sẽ là khu vực
            {
              model: Place,
              as: 'ParentPlace',
              attributes: ['id', 'area_name', 'level'],
            },
          ],
        },
        // Lấy thông tin chi tiết của phòng nếu record là room (với mối quan hệ 1:1 qua cột id)
        {
          model: RoomDetail,
          as: 'room_detail',
          required: false,
        },
      ],
    });

    if (!placeDetail) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.status(200).json(placeDetail);
  } catch (error) {
    console.error('Error fetching place detail:', error);
    res.status(500).json({ error: error.message });
  }
};
const createPlaces = async (req, res) => {
  try {
    const { level } = req.body;
    if (!level) {
      return res.status(400).json({ error: 'level is required' });
    }
    if (level === 'area') {
      const { area_name } = req.body;
      if (!area_name) {
        return res.status(400).json({ error: 'area_name is required' });
      }
      const newArea = await Place.create({
        id: uuidv4(),
        area_name: area_name,
        parent_id: null,
        level: 'area',
      });
      return res.status(200).json({
        message: 'Add new area success',
        area: newArea,
      });
    }
    if (level === 'floor') {
      const { floor_name, areaId } = req.body;
      if (!floor_name || !areaId) {
        return res
          .status(400)
          .json({ error: 'floor_name and areaId are required' });
      }
      const area = await Place.findOne({
        where: { id: areaId, level: 'area' },
      });
      if (!area) {
        return res.status(404).json({ error: 'Area not found' });
      }
      const newFloor = await Place.create({
        id: uuidv4(),
        area_name: floor_name,
        parent_id: areaId,
        level: 'floor',
      });
      return res.status(200).json({
        message: 'Add new floor success',
        floor: newFloor,
      });
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
      } = req.body;
      if (!room_name || !floorId) {
        return res
          .status(400)
          .json({ error: 'room_name and floorId are required' });
      }
      const floor = await Place.findOne({
        where: { id: floorId, level: 'floor' },
      });
      if (!floor) {
        return res.status(400).json({ error: 'Floor not found' });
      }
      const roomId = uuidv4();
      const newRoom = await Place.create({
        id: roomId,
        area_name: room_name,
        parent_id: floorId,
        level: 'room',
      });
      const newRoomDetail = await RoomDetail.create({
        id: roomId,
        room_detailcol: room_detailcol || null,
        room_number: room_number,
        capacity: capacity || null,
        status: status || null,
        leader: leader || null,
        gender: gender || null,
      });
      return res.status(200).json({
        place: newRoom,
        roomDetail: newRoomDetail,
      });
    }
  } catch (error) {
    console.error('Error creating place:', error);
    res.status(500).json({ error: error.message });
  }
};
const updatePlaces = async (req, res) => {
  try {
    const { id } = req.params;
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
    } = req.body;
    if (!level) {
      return res.status(400).json({ error: 'level is required' });
    }
    const placeRecord = await Place.findOne({
      where: { id: id, level: level },
    });
    if (!placeRecord) {
      return res.status(400).json({
        error: `${level} not found with the given id`,
      });
    }
    if (level === 'area') {
      const updateArea = await placeRecord.update({
        area_name: area_name || placeRecord.area_name,
        parent_id: null,
      });
      return res.status(200).json(updateArea);
    } else if (level === 'floor') {
      if (parent_id) {
        const parentArea = await Place.findOne({
          where: { id: parent_id, level: 'area' },
        });
        if (!parentArea) {
          return res.status(400).json({ error: 'Parent area not found' });
        }
      }
      const updateFloor = await placeRecord.update({
        area_name: area_name || placeRecord.area_name,
        parent_id: parent_id || placeRecord.parent_id,
      });
      return res.status(200).json(updateFloor);
    } else if (level === 'room') {
      if (parent_id) {
        const parentFloor = await Place.findOne({
          where: { id: parent_id, level: 'floor' },
        });
        if (!parentFloor) {
          return res.status(400).json({ error: 'Parent floor not found' });
        }
      }
      const roomDetailRecord = await RoomDetail.findOne({
        where: { id: id },
      });
      if (!roomDetailRecord) {
        return res.status(400).json({ error: 'Room detail not found' });
      }
      const updateRoom = await placeRecord.update({
        area_name: area_name || placeRecord.area_name,
        parent_id: parent_id || placeRecord.parent_id,
      });
      const updateRoomDetail = await roomDetailRecord.update({
        room_detailcol:
          room_detailcol !== undefined
            ? room_detailcol
            : roomDetailRecord.room_detailcol,
        room_number:
          room_number !== undefined
            ? room_number
            : roomDetailRecord.room_number,
        capacity: capacity !== undefined ? capacity : roomDetailRecord.capacity,
        status: status !== undefined ? status : roomDetailRecord.status,
        leader: leader !== undefined ? leader : roomDetailRecord.leader,
        gender: gender !== undefined ? gender : roomDetailRecord.gender,
      });
      return res.status(200).json({
        roomPlace: updateRoom,
        roomDetail: updateRoomDetail,
      });
    } else {
      return res.status(400).json({ error: 'Invalid level' });
    }
  } catch (error) {
    console.error('Error updating place:', error);
    res.status(500).json({ error: error.message });
  }
};
const getAreas = async (req, res) => {
  try {
    const query = `
    SELECT 
      p.id, 
      p.area_name,
      (
        SELECT COUNT(*) 
        FROM place f 
        WHERE f.parent_id = p.id AND f.level = 'floor'
      ) AS total_floors,
      (
        SELECT COUNT(*) 
        FROM place r 
        JOIN place f ON r.parent_id = f.id 
        WHERE f.parent_id = p.id AND r.level = 'room'
      ) AS total_rooms
    FROM place p
    WHERE p.parent_id IS NULL AND p.level = 'area';
  `;
    const [result] = await sequelize.query(query);
    res.status(200).json(result);
  } catch (error) {
    console.log('Error to fetch area:', error);
    res.status(500).json({ error: error.message });
  }
};
const getFloorsByArea = async (req, res) => {
  try {
    const { areaId } = req.query;
    if (!areaId) {
      return res.status(400).json({ error: 'floorId is required' });
    }
    const query = `
            SELECT 
          f.id,
          f.area_name AS floor_name,
          (
            SELECT COUNT(*) 
            FROM place r 
            WHERE r.parent_id = f.id 
              AND r.level = 'room'
          ) AS total_rooms
        FROM place f
        WHERE f.level = 'floor'
          AND f.parent_id = '${areaId}';
    `;
    const [result] = await sequelize.query(query);
    res.status(200).json(result);
  } catch (error) {
    console.log('Error to fetch floor:', error);
    res.status(500).json({ error: error.message });
  }
};
const getRoomsByFloor = async (req, res) => {
  try {
    const { floorId } = req.query;
    if (!floorId) {
      return res.status(400).json({ error: 'floorId is required' });
    }
    const rooms = await Place.findAll({
      where: {
        level: 'room',
        parent_id: floorId,
      },
      include: [
        {
          model: RoomDetail,
          as: 'room_detail',
        },
      ],
    });
    res.status(200).json(rooms);
  } catch (error) {
    console.log('Error to fetch room:', error);
    res.status(500).json({ error: error.message });
  }
};
const getRoomsByArea = async (req, res) => {
  const { areaId } = req.query;
  if (!areaId) {
    return res.status(400).json({ error: 'areaId is required' });
  }
  const rooms = await Place.findAll({
    where: { level: 'room' },
    include: [
      {
        model: Place,
        as: 'ParentPlace',
        where: { parent_id: areaId },
        attributes: [],
      },
      {
        model: RoomDetail,
        as: 'room_detail',
      },
    ],
  });
  res.status(200).json(rooms);
};
const getAndFindRooms = async (req, res) => {
  try {
    try {
      const { areaId, search, page, limit, status, gender } = req.query;
      if (!areaId) {
        return res.status(400).json({ error: 'areaId is required' });
      }

      const pageNum = parseInt(page, 10) || 1;
      const pageSize = parseInt(limit, 10) || 10;
      const offset = (pageNum - 1) * pageSize;

      // Tạo điều kiện tìm kiếm nếu có search parameter (sử dụng LIKE)
      const searchCondition = search
        ? {
            [Op.or]: [
              { area_name: { [Op.eq]: search } },
              { '$room_detail.room_number$': { [Op.eq]: search } },
            ],
          }
        : {};
      const roomDetailFilter = {};
      if (gender) {
        roomDetailFilter.gender = gender;
      }
      if (status) {
        roomDetailFilter.status = status;
      }
      // Truy vấn: Lấy các phòng (Place.level = 'room')
      // mà tầng chứa (ParentPlace) có parent_id = areaId.
      // Include RoomDetail để lấy thông tin chi tiết của phòng.
      const rooms = await Place.findAll({
        where: {
          level: 'room',
          ...searchCondition,
        },
        include: [
          {
            model: Place,
            as: 'ParentPlace',
            where: { parent_id: areaId },
            attributes: [], // Ẩn thông tin tầng nếu không cần thiết
          },
          {
            model: RoomDetail,
            as: 'room_detail',
            where:
              Object.keys(roomDetailFilter).length > 0
                ? roomDetailFilter
                : undefined,
            required: true, // Chỉ trả về các phòng có record RoomDetail
          },
        ],
        offset,
        limit: pageSize,
      });

      res.status(200).json({
        page: pageNum,
        limit: pageSize,
        data: rooms,
      });
    } catch (error) {
      console.error('Error fetching rooms by area:', error);
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const addNewArea = async (req, res) => {
  try {
    const { area_name } = req.body;
    if (!area_name) {
      return res.status(400).json({ error: 'area_name is required' });
    }
    const newArea = await Place.create({
      id: uuidv4(),
      area_name: area_name,
      parent_id: null,
      level: 'area',
    });
    res.status(200).json(newArea);
  } catch (error) {
    console.log('Error creating new area: ', error);
    res.status(500).json({ error: error.message });
  }
};
const updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { area_name } = req.body;
    if (!area_name) {
      return res.status(400).json({ error: 'area_name is required' });
    }
    const area = await Place.findOne({
      where: { id, level: 'area' },
    });
    if (!area) {
      return res.status(404).json({ error: 'Area not found' });
    }
    await area.update({ area_name: area_name });
    return res.status(200).json(area);
  } catch (error) {
    console.log('Error updating area: ', error);
    res.status(500).json({ error: error.message });
  }
};
const addNewFloor = async (req, res) => {
  try {
    const { areaId, floor_name } = req.body;
    if (!areaId || !floor_name) {
      return res
        .status(400)
        .json({ error: 'areaId and floor_name is required' });
    }
    const area = await Place.findOne({
      where: { id: areaId, level: 'area' },
    });
    if (!area) {
      return res.status(404).json({ error: 'Area not found' });
    }
    const newFloor = await Place.create({
      id: uuidv4(),
      area_name: floor_name,
      parent_id: areaId,
      level: 'floor',
    });
    res.status(200).json(newFloor);
  } catch (error) {
    console.log('Error adding new floor: ', error);
    res.status(500).json({ error: error.message });
  }
};
const updateFloor = async (req, res) => {
  try {
    const { id } = req.params;
    const { floor_name } = req.body;
    if (!floor_name) {
      return res.status(400).json({ error: 'floor name is required' });
    }
    const floor = await Place.findOne({
      where: {
        id: id,
        level: 'floor',
      },
    });
    if (!floor) {
      return res.status(404).json({ error: 'Floor not found' });
    }
    await floor.update({ area_name: floor_name });
    res.status(200).json(floor);
  } catch (error) {
    console.log('Error updating floor: ', error);
    res.status(500).json({ error: error.message });
  }
};
const addNewRoom = async (req, res) => {
  const transaction = await Place.sequelize.transaction();
  try {
    const {
      floorId,
      room_name,
      room_detailcol,
      room_number,
      capacity,
      status,
      leader,
      gender,
    } = req.body;
    if (!floorId || !room_name) {
      return res
        .status(400)
        .json({ error: 'floorId and room_name is required' });
    }
    // Add new record to Place
    const roomId = uuidv4();
    const newRoomPlace = await Place.create(
      {
        id: roomId,
        area_name: room_name,
        parent_id: floorId,
        level: 'room',
      },
      { transaction },
    );
    // Add new record to RoomDetail
    const newRoomDetail = await RoomDetail.create(
      {
        id: roomId,
        room_detailcol: room_detailcol,
        room_number: room_number,
        capacity: capacity,
        status: status,
        leader: leader,
        gender: gender,
      },
      { transaction },
    );
    await transaction.commit();
    res.status(200).json({
      room: newRoomPlace,
      room_detail: newRoomDetail,
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating new room:', error);
    res.status(500).json({ error: error.message });
  }
};
const updateRoom = async (req, res) => {
  const transaction = await Place.sequelize.transaction();
  try {
    const { id } = req.params;
    const {
      room_name,
      parent_id,
      room_detailcol,
      room_number,
      capacity,
      status,
      leader,
      gender,
    } = req.body;
    const roomPlace = await Place.findOne({
      where: {
        id: id,
        level: 'room',
      },
      transaction,
    });
    if (!roomPlace) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Room not found' });
    }
    const roomDetail = await RoomDetail.findOne({
      where: {
        id: id,
      },
      transaction,
    });
    if (!roomDetail) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Room Detail not found' });
    }
    await roomPlace.update(
      {
        area_name: room_name || roomPlace.area_name,
        parent_id: parent_id || roomPlace.parent_id,
      },
      { transaction },
    );
    await roomDetail.update(
      {
        room_detailcol:
          room_detailcol !== undefined
            ? room_detailcol
            : roomDetail.room_detailcol,
        room_number:
          room_number !== undefined ? room_number : roomDetail.room_number,
        capacity: capacity !== undefined ? capacity : roomDetail.capacity,
        status: status !== undefined ? status : roomDetail.status,
        leader: leader !== undefined ? leader : roomDetail.leader,
        gender: gender !== undefined ? gender : roomDetail.gender,
      },
      { transaction },
    );
    await transaction.commit();
    res.status(200).json({
      room: roomPlace,
      room_detail: roomDetail,
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating room:', error);
    res.status(500).json({ error: error.message });
  }
};
const areaController = {
  getPlaces,
  createPlaces,
  updatePlaces,
  getPlaceDetail,
  getAreas,
  getFloorsByArea,
  getRoomsByFloor,
  getRoomsByArea,
  getAndFindRooms,
  addNewArea,
  updateArea,
  addNewFloor,
  updateFloor,
  addNewRoom,
  updateRoom,
};
export default areaController;
