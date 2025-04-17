import {
  createReportService,
  getReportService,
  updateReportService,
} from '../services/reportService.js';

const createReport = async (req, res) => {
  try {
    const checkin_photo = req.file
      ? `upload/reports/${req.file.filename}`
      : null;
    const result = await createReportService(req.body, checkin_photo);
    res.status(201).json(result);
  } catch (error) {
    console.log('Lỗi tạo báo cáo:', error);
    res.status(500).json({
      error: 'Lỗi tạo báo cáo',
    });
  }
};
const getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getReportService(id);
    res.status(200).json(result);
  } catch (error) {
    console.log('Lỗi lấy báo cáo', error);
    res.status(500).json({
      error: 'Lỗi lấy báo cáo',
    });
  }
};
const updateReport = async (req, res) => {
  try {
    const updatedReport = await updateReportService(req);
    console.log(updatedReport);
    res.status(200).json(updatedReport);
  } catch (error) {
    console.log('Lỗi sửa báo cáo', error);
    res.status(500).json({
      error: 'Lỗi sửa báo cáo',
    });
  }
};

const reportController = {
  createReport,
  getReport,
  updateReport,
};

export default reportController;
