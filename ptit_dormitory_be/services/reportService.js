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
export const getReportService = async () => {};

export const updateReportService = async () => {};
