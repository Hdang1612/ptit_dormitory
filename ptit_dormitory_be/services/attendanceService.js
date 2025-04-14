import { v4 as uuidv4 } from 'uuid';
import { Attendance } from '../models/association.js';

export const createAttendanceService = async (data) => {
  const { student_id, shift_id, status } = data;
  if (!student_id || !shift_id) {
    throw new Error('need student id and shift id');
  }
  const newAttendance = await Attendance.create({
    id: uuidv4(),
    student_id: student_id,
    shift_id: shift_id,
    status: typeof status !== 'undefined' ? status : 'false',
  });
  return {
    message: 'Thêm thành công !',
    data: newAttendance,
  };
};

export const updateAttendanceService = async (id, status) => {
  const record = await Attendance.findOne({
    where: { id: id },
  });
  if (!record) {
    throw new Error('Not existed attendance !');
  }
  const updated = await record.update({
    status: typeof status !== 'undefined' ? status : record.status,
  });
  return {
    message: 'Cập nhật trạng thái thành công !',
    data: updated,
  };
};
