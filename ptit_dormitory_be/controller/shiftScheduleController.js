import {
  createShiftScheduleService,
  updateShiftScheduleService,
} from '../services/shiftScheduleService.js';

const createShiftSchedule = async (req, res) => {
  try {
    const data = req.body;
    const newShift = await createShiftScheduleService(data);
    return res.status(201).json({
      message: 'Thêm lịch trực thành công !',
      data: newShift,
    });
  } catch (error) {
    console.log('Lỗi thêm lịch trực ', error);
    return res.status(500).json({
      message: 'Lỗi hệ thống, không thêm được lịch trực !',
      error: error.message,
    });
  }
};

const getListShiftSchedule = async (req, res) => {};
const updateShiftSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateSchedule = await updateShiftScheduleService(id, data);
    return res.status(200).json({
      message: 'Cập nhật ca trực thành công !',
      data: updateSchedule,
    });
  } catch (error) {
    console.log('Lỗi update ca trực: ', error);
    if (error.message === 'Not existed !') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({
      message: 'Lỗi hệ thống, không thể cập nhật ca trực',
      error: error.message,
    });
  }
};

const shiftScheduleController = {
  createShiftSchedule,
  getListShiftSchedule,
  updateShiftSchedule,
};
export default shiftScheduleController;
