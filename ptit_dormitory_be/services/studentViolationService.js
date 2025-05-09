import StudentViolation from '../models/StudentVIolation.js';
import User from '../models/Users.js';
import ShiftSchedule from '../models/ShiftSchedule.js';
import ApiError from '../utils/apiError.js';

export const createViolationService = async ({ student_id, shift_id, description }) => {
  if (!student_id || !shift_id) {
    throw new ApiError(400,'Thiếu thông tin bắt buộc');
  }

  return await StudentViolation.create({ student_id, shift_id, description });
};

export const getViolationsService = async (type, id) => {
  if (type === 'student') {
    return await StudentViolation.findAll({
      where: { student_id: id },
    //   include: [{ model: ShiftSchedule }],
      order: [['created_at', 'DESC']],
    });
  }

  if (type === 'shift') {
    return await StudentViolation.findAll({
      where: { shift_id: id },
    //   include: [{ model: User }],
      order: [['created_at', 'DESC']],
    });
  }

  throw new ApiError(400,'Tham số type không hợp lệ');
};
