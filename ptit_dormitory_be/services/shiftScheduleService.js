import { v4 as uuidv4 } from 'uuid';
import ShiftSchedule from '../models/ShiftSchedule.js';

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
