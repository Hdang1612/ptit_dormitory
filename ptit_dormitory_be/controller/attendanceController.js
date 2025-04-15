import {
  createAttendanceService,
  updateAttendanceService,
} from '../services/attendanceService.js';

const createAttendance = async (req, res) => {
  try {
    const result = await createAttendanceService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.log('Error creating new attendance :', error);
    res.status(500).json({
      error: error.message,
    });
  }
};
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query.status;
    const result = await updateAttendanceService(id, status);
    return res.status(200).json(result);
  } catch (error) {
    console.log('Error updating a attendance: ', error);
    res.status(500).json({
      error: error.message,
    });
  }
};
const attendanceController = {
  createAttendance,
  updateAttendance,
};
export default attendanceController;
