import express from 'express';
import shiftScheduleController from '../controller/shiftScheduleController.js';
const shiftScheduleRoute = express.Router();

shiftScheduleRoute.post('/create', shiftScheduleController.createShiftSchedule);
shiftScheduleRoute.get(
  '/getListOfAllUser',
  shiftScheduleController.getListShiftSchedule,
);
shiftScheduleRoute.get(
  '/getListOfUser/:user_id',
  shiftScheduleController.getListOfUser,
);
shiftScheduleRoute.put(
  '/edit/:id',
  shiftScheduleController.updateShiftSchedule,
);
export default shiftScheduleRoute;
