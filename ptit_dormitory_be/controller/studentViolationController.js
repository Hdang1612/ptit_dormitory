import {
  createViolationService,
  getViolationsService,
} from '../services/studentViolationService.js';

export const createViolation = async (req, res, next) => {
  try {
    const { student_id, shift_id, description } = req.body;
    const newViolation = await createViolationService({
      student_id,
      shift_id,
      description,
    });
    res.status(201).json({
      success: true,
      message: 'Tạo lỗi thành công',
      data: newViolation,
    });
  } catch (error) {
    next(error);
  }
};

export const getViolations = async (req, res, next) => {
  try {
    const { type, id } = req.query;
    const violations = await getViolationsService(type, id);
    res.json({
      success: true,
      message: 'Lấy dữ liệu lỗi thành công',
      data: violations,
    });
  } catch (error) {
    next(error);
  }
};
