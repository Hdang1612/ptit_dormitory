import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import xlsx from 'xlsx';
import fs from 'fs';

import { Op } from 'sequelize';
import User from '../models/Users.js';
import StudentRoom from '../models/StudentRoom.js';
import Place from '../models/Place.js';

import ApiError from '../utils/apiError.js';
import {
  columnMappingForeignStudent,
  columnMappingStudent,
  genderMapping,
  genderMappingUser,
} from '../constants/mapping.js';
import { parseDate } from '../utils/convertDate.js';

const getAreaNameFromRoomId = async (roomId) => {
  let currentPlace = await Place.findByPk(roomId);
  while (currentPlace && currentPlace.parent_id) {
    const parent = await Place.findByPk(currentPlace.parent_id);
    if (parent?.level === 'area') return parent.area_name;
    currentPlace = parent;
  }
  return null;
};
// Get danh sách user
export const getListUserService = async (
  search,
  page,
  limit,
  role,
  placeId,
) => {
  const offset = (page - 1) * limit;
  let studentIdsInPlace = null;
  if (placeId) {
    // Đệ quy để lấy tất cả room_id từ placeId bất kỳ (area, floor, hoặc room)
    const getAllRoomIds = async (startId) => {
      const stack = [startId];
      const roomIds = [];

      while (stack.length) {
        const currentId = stack.pop();
        const children = await Place.findAll({
          where: { parent_id: currentId },
        });

        for (const child of children) {
          if (child.level === 'room') {
            roomIds.push(child.id);
          } else {
            stack.push(child.id);
          }
        }

        const currentPlace = await Place.findByPk(currentId);
        if (currentPlace && currentPlace.level === 'room') {
          roomIds.push(currentId);
        }
      }

      return roomIds;
    };

    const roomIds = await getAllRoomIds(placeId);

    if (roomIds.length > 0) {
      const studentRoomRecords = await StudentRoom.findAll({
        where: { room_id: { [Op.in]: roomIds } },
        attributes: ['student_id'],
      });

      studentIdsInPlace = studentRoomRecords.map((record) => record.student_id);
    } else {
      studentIdsInPlace = []; // Không có room nào thì không có user nào
    }
  }

  const whereClause = {
    ...(search && {
      [Op.or]: [
        { first_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ],
    }),
    ...(role && { role_id: role }),
    ...(studentIdsInPlace && {
      id: {
        [Op.in]: studentIdsInPlace,
      },
    }),
  };
  const { count, rows } = await User.findAndCountAll({
    where: whereClause,
    limit: limit,
    offset,
    order: [['create_at', 'DESC']],
    attributes: [
      'id',
      'first_name',
      'last_name',
      'email',
      'phone_number',
      'dob',
      'role_id',
      // 'room_id',
      'create_at',
    ],
    include: [
      {
        model: StudentRoom,
        attributes: ['room_id'],
        required: false,
        include: [
          {
            model: Place,
            attributes: ['area_name'],
            required: false,
          },
        ],
      },
    ],
  });
  const users = rows.map((user) => {
    const { StudentRoom, ...rest } = user.toJSON();
    return {
      ...rest,
      room: StudentRoom?.Place?.area_name || null,
    };
  });

  return {
    users: users,
    pagination: {
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    },
  };
};

// get thôgn tin user theo id
export const getUserByIdService = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

// tạo tài khoản
export const createUserService = async (userData) => {
  const {
    email,
    password,
    phone_number,
    dob,
    first_name,
    last_name,
    status,
    role_id = 1,
  } = userData;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(404, 'User already exist');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    id: uuidv4(),
    email,
    password: hashedPassword,
    phone_number,
    dob,
    first_name,
    last_name,
    status: status || 1,
    role_id,
  });

  return {
    id: newUser.id,
    email: newUser.email,
    role_id: newUser.role_id,
  };
};

// cập nhật thông tin tài khoản
export const updateUserService = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (updateData.email) {
    const existingUser = await User.findOne({
      where: { email: updateData.email },
    });
    if (existingUser && existingUser.id !== userId) {
      throw new ApiError(400, 'Email already exist');
    }
  }

  if (updateData.password) {
    const hashedPassword = await bcrypt.hash(updateData.password, 10);
    updateData.password = hashedPassword;
  }

  Object.keys(updateData).forEach((key) => {
    if (updateData[key] !== undefined) {
      user[key] = updateData[key];
    }
  });

  await user.save();
  return { success: true, user };
};

// Xóa tài khoản
export const deleteUserService = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  await user.destroy();
  return { message: 'deleted successfully' };
};

const DEFAULT_PWD = process.env.DEFAULT_PASSWORD_STUDENT;
// import user từ file excel
export const importForeignStudentFromExcelService = async (filePath) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const users = await Promise.all(
      data.map(async (row) => {
        const mappedUser = {
          id: uuidv4(),
          role_id: '4',
        };

        for (const key in columnMappingForeignStudent) {
          let value = row[key];
          const dbField = columnMappingForeignStudent[key];

          if (dbField === 'name') {
            const nameParts = value.trim().split(' ');
            mappedUser['first_name'] = nameParts.slice(0, -1).join(' ');
            mappedUser['last_name'] = nameParts.slice(-1).join(' ');
            continue;
          }

          if (dbField === 'gender') {
            value = genderMapping[value] || 'Other';
          }

          if (['dob', 'visa_start', 'visa_end'].includes(dbField)) {
            value = parseDate(value);
          }

          mappedUser[dbField] = value;
          // Thêm password mặc định
          const hashedPassword = await bcrypt.hash(DEFAULT_PWD, 10);
          mappedUser.password = hashedPassword;
        }

        //  check user exist
        const existingUser = await User.findOne({
          where: { student_code: mappedUser.student_code },
        });

        if (existingUser) {
          await existingUser.update(mappedUser);
          return { action: 'updated', student_code: mappedUser.student_code };
        } else {
          await User.create(mappedUser);
          return { action: 'inserted', student_code: mappedUser.student_code };
        }
      }),
    );

    // Đếm số lượng insert và update
    const insertedCount = users.filter((u) => u.action === 'inserted').length;
    const updatedCount = users.filter((u) => u.action === 'updated').length;

    return {
      inserted: insertedCount,
      updated: updatedCount,
    };
  } catch (error) {
    console.error(error);
    throw new ApiError(400, 'Import failed');
  }
};

export const importVnStudentFromExcelService = async (filePath) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    fs.unlinkSync(filePath);

    const results = await Promise.all(
      data.map(async (row) => {
        const mappedUser = {
          id: uuidv4(),
          role_id: '4',
        };

        for (const key in columnMappingStudent) {
          let value = row[key];
          const dbField = columnMappingStudent[key];

          if (dbField === 'name') {
            if (!value || typeof value !== 'string') {
              mappedUser['first_name'] = '';
              mappedUser['last_name'] = '';
            } else {
              const nameParts = value.trim().split(/\s+/);
              mappedUser['first_name'] = nameParts.slice(0, -1).join(' ');
              mappedUser['last_name'] = nameParts.slice(-1).join(' ');
            }
            continue;
          }

          if (dbField === 'gender') {
            value = genderMappingUser[value] || 'Other';
          }

          mappedUser[dbField] = value;
        }

        let studentCode = row['Mã sinh viên']
          ? row['Mã sinh viên'].toString().trim()
          : '';

        if (studentCode.startsWith("'")) {
          studentCode = studentCode.slice(1);
        }
        mappedUser.student_code = studentCode;
        const hashedPassword = await bcrypt.hash(DEFAULT_PWD, 10);
        mappedUser.password = hashedPassword;

        // Tạo hoặc cập nhật user
        let userRecord = await User.findOne({
          where: { student_code: mappedUser.student_code },
        });

        const action = userRecord ? 'updated' : 'inserted';
        if (userRecord) {
          await userRecord.update(mappedUser);
        } else {
          userRecord = await User.create(mappedUser);
        }

        // Xử lý phòng
        const roomNumber = row['Phòng ở'] || row['Phòng ở KTX'];
        if (!roomNumber) {
          return {
            student_code: studentCode,
            action,
            room: null,
            room_action: 'skipped',
            error: 'Thiếu phòng ở',
          };
        }
        console.log('Phòng ở từ Excel:', roomNumber);
        const room = await Place.findOne({
          where: {
            area_name: roomNumber,
            parent_id: {
              [Op.in]: ['B5-F1', 'B5-F2', 'B5-F3', 'B5-F4', 'B5-F5'],
            },
          },
        });

        if (!room) {
          return {
            student_code: studentCode,
            action,
            room: roomNumber,
            room_action: 'skipped',
            error: 'Không tìm thấy phòng',
          };
        }

        const existingSR = await StudentRoom.findOne({
          where: { student_id: userRecord.id },
        });

        if (existingSR) {
          await existingSR.update({ room_id: room.id, apply_date: new Date() });
        } else {
          await StudentRoom.create({
            student_id: userRecord.id,
            room_id: room.id,
            apply_date: new Date(),
          });
        }

        return {
          student_code: studentCode,
          action,
          room: roomNumber,
          room_action: existingSR ? 'updated' : 'inserted',
        };
      }),
    );

    const inserted = results.filter((r) => r.action === 'inserted').length;
    const updated = results.filter((r) => r.action === 'updated').length;
    const roomInserted = results.filter(
      (r) => r.room_action === 'inserted',
    ).length;
    const roomUpdated = results.filter(
      (r) => r.room_action === 'updated',
    ).length;
    const skipped = results.filter((r) => r.room_action === 'skipped').length;
    console.log(
      '>>>>>>>>',
      inserted,
      updated,
      roomInserted,
      roomUpdated,
      skipped,
    );
    return {
      user_inserted: inserted,
      user_updated: updated,
      room_inserted: roomInserted,
      room_updated: roomUpdated,
      room_skipped: skipped,
      details: results,
    };
  } catch (error) {
    console.error(error);
    throw new ApiError(400, 'Import failed');
  }
};
