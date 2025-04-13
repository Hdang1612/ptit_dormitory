import { v4 as uuidv4 } from 'uuid';
import { ShiftSchedule, User, Place } from '../models/association.js';

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
