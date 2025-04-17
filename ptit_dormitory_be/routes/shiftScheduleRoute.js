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
// Báo cáo của ca trực (danh sách sinh viên thuộc khu vực của ca trực đó kèm trạng thái điểm danh)
shiftScheduleRoute.get(
  '/attedanceOfShift/:shift_id/:place_id',
  shiftScheduleController.getAttendanceOfShift,
);
export default shiftScheduleRoute;
