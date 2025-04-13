import express from 'express';
import shiftScheduleController from '../controller/shiftScheduleController.js';
const shiftScheduleRoute = express.Router();

shiftScheduleRoute.post('/create', shiftScheduleController.createShiftSchedule);
shiftScheduleRoute.get(
  '/getListOfAllUser',
  shiftScheduleController.getListShiftSchedule,
);
shiftScheduleRoute.put(
  '/edit/:id',
  shiftScheduleController.updateShiftSchedule,
);
export default shiftScheduleRoute;
