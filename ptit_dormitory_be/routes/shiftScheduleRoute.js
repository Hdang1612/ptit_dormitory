import express from 'express';
import shiftScheduleController from '../controller/shiftScheduleController.js';
const shiftScheduleRoute = express.Router();

// Tạo mới lịch trực
shiftScheduleRoute.post('/create', shiftScheduleController.createShiftSchedule);
// Lấy ra danh sách lịch trực của tất cả user
shiftScheduleRoute.get(
  '/getListOfAllUser',
  shiftScheduleController.getListShiftSchedule,
);
// Lấy ra danh sách lịch trực của 1 user
shiftScheduleRoute.get(
  '/getListOfUser/:user_id',
  shiftScheduleController.getListOfUser,
);
// Cập nhật lịch trực
shiftScheduleRoute.put(
  '/edit/:id',
  shiftScheduleController.updateShiftSchedule,
);
export default shiftScheduleRoute;
