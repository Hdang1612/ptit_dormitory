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
const getReport = async (req, res) => {};
const updateReport = async (req, res) => {};

const reportController = {
  createReport,
  getReport,
  updateReport,
};

export default reportController;
