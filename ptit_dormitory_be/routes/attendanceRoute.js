import express from 'express';
import attendanceController from '../controller/attendanceController.js';
const attendanceRoute = express.Router();

attendanceRoute.post('/create', attendanceController.createAttendance);
attendanceRoute.get('/getList');
attendanceRoute.put('/update/:id', attendanceController.updateAttendance);

export default attendanceRoute;
