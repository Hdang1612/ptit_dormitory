import express from 'express';
import uploadReport from '../middleware/uploadReports.js';
import reportController from '../controller/reportController.js';
const reportRoute = express.Router();

reportRoute.get('/getReport/:id', reportController.getReport);
reportRoute.post(
  '/createReport',
  uploadReport.single('checkin_photo'),
  reportController.createReport,
);
reportRoute.put(
  '/updateReport/:id',
  uploadReport.single('checkin_photo'),
  reportController.updateReport,
);

export default reportRoute;
