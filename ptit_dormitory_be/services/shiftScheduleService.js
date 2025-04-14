import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import {
  ShiftSchedule,
  User,
  Place,
  Attendance,
  StudentRoom,
} from '../models/association.js';

export const createShiftScheduleService = async (data) => {
  const { user_id, shift_date, place_id, shift_start, shift_end, status } =
    data;
  const newShiftSchedule = await ShiftSchedule.create({
    id: uuidv4(),
    user_id: user_id,
    shift_date: shift_date,
    place_id: place_id,
    shift_start: shift_start,
    shift_end: shift_end,
    status: status !== undefined ? status : false,
  });
  return newShiftSchedule;
};
export const updateShiftScheduleService = async (id, data) => {
  const { user_id, shift_date, place_id, shift_start, shift_end, status } =
    data;
  const record = await ShiftSchedule.findOne({
    where: { id },
  });
  if (!record) {
    throw { status: 400, message: 'Not existed !' };
  }
  const updated = await record.update({
    user_id: user_id !== undefined ? user_id : record.user_id,
    shift_date: shift_date !== undefined ? shift_date : record.shift_date,
    place_id: place_id !== undefined ? place_id : record.place_id,
    shift_start: shift_start !== undefined ? shift_start : record.shift_start,
    shift_end: shift_end !== undefined ? shift_end : record.shift_end,
    status: status !== undefined ? status : record.status,
  });
  return updated;
};
export const getListShiftScheduleService = async (filters, pagination) => {
  const { shift_date, place_id } = filters;
  const { page = 1, limit = 10 } = pagination;
  const whereCondition = {};
  if (shift_date) whereCondition.shift_date = shift_date;
  if (place_id) whereCondition.place_id = place_id;
  const offset = (page - 1) * limit;
  const { rows: data, count: total } = await ShiftSchedule.findAndCountAll({
    where: whereCondition,
    include: [
      {
        model: Place,
        as: 'place',
        attributes: ['id', 'area_name'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'first_name', 'last_name'],
      },
    ],
    order: [
      ['shift_date', 'ASC'],
      ['shift_start', 'ASC'],
    ],
    offset,
    limit,
  });
  return {
    pagination: {
      total: total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
    },
    data: data,
  };
};
export const getListOfUserService = async (user_id, filters, pagination) => {
  if (!user_id || typeof user_id !== 'string') {
    throw new Error('user_id khong hop le');
  }
  const { shift_date } = filters;
  const { page = 1, limit = 10 } = pagination;

  const offset = (page - 1) * limit;
  const whereCondition = {
    user_id,
  };
  if (shift_date) {
    whereCondition.shift_date = shift_date;
  }
  const { rows: data, count: total } = await ShiftSchedule.findAndCountAll({
    where: whereCondition,
    include: [
      {
        model: Place,
        as: 'place',
        attributes: ['id', 'area_name'],
      },
    ],
    order: [
      ['shift_date', 'ASC'],
      ['shift_start', 'ASC'],
    ],
    offset,
    limit,
  });
  return {
    pagination: {
      total: total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
    },
    data: data,
  };
};
export const getAttendanceOfShiftService = async (
  shift_id,
  place_id,
  pagination,
) => {
  // Lấy record của place để xác định level
  const placeRecord = await Place.findOne({ where: { id: place_id } });
  if (!placeRecord) {
    throw new Error('Place not found');
  }
  let roomIds = [];
  if (placeRecord.level === 'area') {
    // lấy tất cả tầng floor thuộc khu vực area
    const floors = await Place.findAll({
      where: { level: 'floor', parent_id: place_id },
      attributes: ['id'],
    });
    const floorIds = floors.map((floor) => floor.id);
    if (floorIds.length === 0)
      return {
        pagination: {
          total: 0,
          page: pagination.page,
          limit: pagination.limit,
          totalPages: 0,
        },
        data: [],
      };
    // lấy tất cả phòng thuộc tầng
    const rooms = await Place.findAll({
      where: { level: 'room', parent_id: { [Op.in]: floorIds } },
      attributes: ['id'],
    });
    roomIds = rooms.map((room) => room.id);
  } else if (placeRecord.level === 'floor') {
    // lấy tất cả phòng thuộc tầng
    const rooms = await Place.findAll({
      where: { level: 'room', parent_id: place_id },
      attributes: ['id'],
    });
    roomIds = rooms.map((room) => room.id);
  } else if (placeRecord.level === 'room') {
    roomIds = [place_id];
  } else {
    throw new Error('Invali level of place');
  }
  if (roomIds.length === 0) {
    return {
      pagination: {
        total: 0,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: 0,
      },
      data: [],
    };
  }
  // Phân trang
  const page = parseInt(pagination.page, 10) || 1;
  const limit = parseInt(pagination.limit, 10) || 10;
  const offset = (page - 1) * limit;
  // Truy vấn danh sách sinh viên thuộc các phòng có id thuộc roomIds, kết hợp LEFT JOIN với attendance.
  // Nếu sinh viên chưa có dữ liệu điểm danh cho ca trực này, trường attendance_status sẽ trả về NULL.
  const dataQuery = `
    SELECT 
      u.id AS student_id,
      u.first_name,
      u.last_name,
      u.student_code,
      sr.room_id,
      a.status AS attendance_status
    FROM student_room sr
    JOIN users u ON sr.student_id = u.id
    LEFT JOIN attendance a
      ON a.student_id = u.id AND a.shift_id = :shift_id
    WHERE sr.room_id IN (:roomIds)
    ORDER BY u.student_code ASC
    LIMIT :limit OFFSET :offset
  `;
  const countQuery = `
    SELECT COUNT(*) AS total
    FROM student_room sr
    WHERE sr.room_id IN (:roomIds)
  `;
  const data = await sequelize.query(dataQuery, {
    replacements: { shift_id, roomIds, limit, offset },
    type: sequelize.QueryTypes.SELECT,
  });

  const countResult = await sequelize.query(countQuery, {
    replacements: { roomIds },
    type: sequelize.QueryTypes.SELECT,
  });
  const total = countResult[0].total;
  const totalPages = Math.ceil(total / limit);
  return {
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
    data,
  };
};
