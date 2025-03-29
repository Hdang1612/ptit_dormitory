import xlsx from 'xlsx';
import fs from 'fs';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import StudentRoom from '../models/StudentRoom.js';
import User from '../models/Users.js';
import Place from '../models/Place.js';
import RoomDetail from '../models/RoomDetail.js';

export const importStudentRoomsService = async (filePath) => {
  try {
    // Đọc file Excel
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Chuyển đổi dữ liệu từ sheet, bắt đầu từ hàng thứ 3 (index 2)
    const data = xlsx.utils.sheet_to_json(sheet, { range: 2 });

    // Xóa file sau khi đọc xong
    fs.unlinkSync(filePath);

    // Xử lý dữ liệu phòng bị thiếu do merge cell
    let lastRoomNumber = null;
    data.forEach((row) => {
      if (row['Phòng ở']) {
        lastRoomNumber = row['Phòng ở'];
      } else {
        row['Phòng ở'] = lastRoomNumber;
      }
    });

    const results = await Promise.all(
      data.map(async (row) => {
        const studentCode = row['Mã sinh viên (Student code)'];
        const roomNumber = row['Phòng ở']; // Đã xử lý merge cell
        const isLeader = row['Đại diện phòng'] === 'TP'; // Kiểm tra trưởng phòng

        if (!studentCode || !roomNumber) {
          return {
            student_code: studentCode,
            room_number: roomNumber,
            action: 'skipped',
            error: 'Thiếu dữ liệu',
          };
        }

        // Tìm sinh viên theo student_code
        const student = await User.findOne({
          where: { student_code: studentCode },
        });
        if (!student) {
          return {
            student_code: studentCode,
            room_number: roomNumber,
            action: 'skipped',
            error: 'Không tìm thấy sinh viên',
          };
        }

        // Tìm phòng theo area_name và parent_id là B1
        const room = await Place.findOne({
          where: {
            area_name: roomNumber,
            parent_id: 'B1-F1',
          },
        });
        if (!room) {
          return {
            student_code: studentCode,
            room_number: roomNumber,
            action: 'skipped',
            error: 'Không tìm thấy phòng',
          };
        }

        // Kiểm tra sinh viên đã có phòng chưa
        const existingStudentRoom = await StudentRoom.findOne({
          where: { student_id: student.id },
        });

        if (existingStudentRoom) {
          await existingStudentRoom.update({ room_id: room.id });
          return {
            student_code: studentCode,
            room_number: roomNumber,
            action: 'updated',
          };
        } else {
          await StudentRoom.create({
            // id: uuidv4(),
            student_id: student.id,
            room_id: room.id,
            apply_date: new Date(),
          });
        }

        // Nếu sinh viên là Trưởng phòng, cập nhật `leader` trong `room_detail`
        if (isLeader) {
          await RoomDetail.update(
            { leader: studentCode },
            { where: { room_number: roomNumber } },
          );
        }

        return {
          student_code: studentCode,
          room_number: roomNumber,
          action: 'inserted',
        };
      }),
    );

    // Đếm số lượng insert, update và skip
    const insertedCount = results.filter((r) => r.action === 'inserted').length;
    const updatedCount = results.filter((r) => r.action === 'updated').length;
    const skippedCount = results.filter((r) => r.action === 'skipped').length;

    return {
      inserted: insertedCount,
      updated: updatedCount,
      skipped: skippedCount,
      details: results,
    };
  } catch (error) {
    console.error('Lỗi import:', error);
    throw new ApiError(400, 'Import thất bại');
  }
};
