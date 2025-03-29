import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/Users.js';
import { Op } from 'sequelize';

import ApiError from '../utils/apiError.js';

// Get danh sách user
export const getListUserService = async (search, page, limit) => {
  const offset = (page - 1) * limit;
  const whereClause = search
    ? {
        [Op.or]: [
          { first_name: { [Op.like]: `%${search}%` } },
          { last_name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      }
    : {};
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
      'room_id',
      'create_at',
    ],
  });

  return {
    users: rows,
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
