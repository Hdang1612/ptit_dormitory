import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { sequelize } from '../config/db.js';
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
  const placeRecord = await Place.findOne({
    where: { id: place_id },
  });
  if (!placeRecord) {
    throw new Error('Place not found !');
  }
  if (placeRecord.level !== 'floor') {
    throw new Error('Place has not level is floor');
  }
  const rooms = await Place.findAll({
    where: { level: 'room', parent_id: place_id },
    attributes: ['id'],
  });
  const roomIds = rooms.map((room) => room.id);
  if (roomIds.length === 0) {
    return {
      pagination: {
        total: 0,
        page: parseInt(pagination.page, 10) || 1,
        limit: parseInt(pagination.limit, 10) || 10,
        totalPages: 0,
      },
      data: [],
    };
  }
  console.log(roomIds);
  const page = parseInt(pagination.page, 10) || 1;
  const limit = parseInt(pagination.limit, 10) || 10;
  const offset = (page - 1) * limit;
  // Query sinh vien thuoc phong voi left join den attendance
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
  LEFT JOIN attendance a ON a.student_id = u.id AND a.shift_id = :shift_id
  WHERE sr.room_id IN (:roomIds)
  ORDER BY u.student_code ASC
  LIMIT :limit OFFSET :offset
`;
  // Querry dem tong so ban ghi de phan trang
  const countQuery = `
    SELECT COUNT(*) AS total
    FROM student_room sr
    WHERE sr.room_id IN (:roomIds)
  `;
  const data = await sequelize.query(dataQuery, {
    replacements: { shift_id, roomIds, limit, offset },
    type: sequelize.QueryTypes.SELECT,
  });
  console.log('data: ', data);
  const countResult = await sequelize.query(countQuery, {
    replacements: { roomIds },
    type: sequelize.QueryTypes.SELECT,
  });
  console.log('countResult: ', countResult);

  const total = countResult[0].total;
  const totalPages = Math.ceil(total / limit);
  // Query thong ke diem danh
  const attendanceAggregateQuery = `
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN a.status = 1 THEN 1 ELSE 0 END) AS trueAttendance,
      SUM(CASE WHEN a.status = 0 THEN 1 ELSE 0 END) AS falseAttendance,
      SUM(CASE WHEN a.status IS NULL THEN 1 ELSE 0 END) AS nullAttendance
    FROM student_room sr
    JOIN users u ON sr.student_id = u.id
    LEFT JOIN attendance a 
      ON a.student_id = u.id 
      AND a.shift_id = :shift_id
    WHERE sr.room_id IN (:roomIds)
  `;
  const attendanceAggregate = await sequelize.query(attendanceAggregateQuery, {
    replacements: { shift_id, roomIds },
    type: sequelize.QueryTypes.SELECT,
  });
  const attendanceStatus = attendanceAggregate[0];
  return {
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
    attendanceStatus,
    data,
  };
};
