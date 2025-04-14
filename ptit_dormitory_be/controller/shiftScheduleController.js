import {
  createShiftScheduleService,
  getAttendanceOfShiftService,
  getListOfUserService,
  getListShiftScheduleService,
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

const getListShiftSchedule = async (req, res) => {
  try {
    const filters = {
      shift_date: req.query.shift_date,
      place_id: req.query.place_id,
    };
    const pagination = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    const result = await getListShiftScheduleService(filters, pagination);
    return res.status(200).json({
      pagination: result.pagination,
      data: result.data,
    });
  } catch (error) {
    console.log('Lỗi lấy danh sách ca trực của mọi người: ', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};
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
const getListOfUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const filters = {
      shift_date: req.query.shift_date,
    };
    console.log(typeof user_id);
    const pagination = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    const result = await getListOfUserService(user_id, filters, pagination);
    return res.status(200).json(result);
  } catch (error) {
    console.log('Lỗi lấy lịch trực cá nhân: ', error);
    res.status(500).json({
      message: 'Lỗi máy chủ',
    });
  }
};
const getAttendanceOfShift = async (req, res) => {
  try {
    const { shift_id, place_id } = req.params;
    const pagination = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    };
    const result = getAttendanceOfShiftService(shift_id, place_id, pagination);
  } catch (error) {
    console.log(
      'Lỗi lấy danh sách sinh viên và trạng thái điểm danh của ca trực',
      error,
    );
    res.status(500).json({
      error: error.message,
    });
  }
};
const shiftScheduleController = {
  createShiftSchedule,
  getListShiftSchedule,
  updateShiftSchedule,
  getListOfUser,
  getAttendanceOfShift,
};
export default shiftScheduleController;
