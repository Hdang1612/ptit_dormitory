import { Report } from '../models/association.js';
import { v4 as uuidv4 } from 'uuid';

export const createReportService = async (data, checkin_photo) => {
  const { content, date, create_by, shift_schedule_id } = data;
  const newReport = await Report.create({
    id: uuidv4(),
    content: content,
    date: date,
    create_by: create_by,
    shift_schedule_id: shift_schedule_id,
    checkin_photo: checkin_photo,
  });
  console.log('', newReport);
  const parsedContent = newReport.content
    ? JSON.parse(newReport.content)
    : null;
  console.log('parse content', parsedContent);
  return {
    message: 'Tạo báo cáo thành công',
    report: {
      id: newReport.id,
      content: parsedContent,
      date: newReport.date,
      create_by: newReport.create_by,
      shift_schedule_id: newReport.shift_schedule_id,
      checkin_photo: newReport.checkin_photo,
    },
  };
};
export const getReportService = async (id) => {
  const report = await Report.findOne({
    where: { id },
  });
  const parsedContent = report.content ? JSON.parse(report.content) : null;
  return {
    message: 'Lấy dữ liệu báo cáo thành công',
    report: {
      id: report.id,
      content: parsedContent,
      date: report.date,
      create_by: report.create_by,
      shift_schedule_id: report.shift_schedule_id,
      checkin_photo: report.checkin_photo,
    },
  };
};

export const updateReportService = async (req) => {
  const { id } = req.params;
  const { content, date, create_by, shift_schedule_id } = req.body;
  const record = await Report.findOne({
    where: { id },
  });
  if (!record) {
    throw new Error('Không tồn tại Report !');
  }
  const checkin_photo = req.file
    ? `upload/reports/${req.file.filename}`
    : record.checkin_photo;

  const updatedReport = await record.update({
    content: content !== undefined ? content : record.content,
    date: date !== undefined ? date : record.date,
    create_by: create_by !== undefined ? create_by : record.create_by,
    checkin_photo:
      checkin_photo !== undefined ? checkin_photo : record.checkin_photo,
    shift_schedule_id:
      shift_schedule_id !== undefined
        ? shift_schedule_id
        : record.shift_schedule_id,
  });
  const parsedContent = updatedReport.content
    ? JSON.parse(updatedReport.content)
    : null;
  return {
    message: 'Cập nhật báo cáo thành công',
    report: {
      id: updatedReport.id,
      content: parsedContent,
      date: updatedReport.date,
      create_by: updatedReport.create_by,
      shift_schedule_id: updatedReport.shift_schedule_id,
      checkin_photo: updatedReport.checkin_photo,
    },
  };
};
