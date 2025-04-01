import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ApiError from '../utils/apiError.js';
import { v4 as uuidv4 } from 'uuid';

import Role from '../models/Role.js';
import User from '../models/Users.js';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

dotenv.config();

export const registerService = async ({
  email,
  password,
  phone_number,
  dob,
  first_name,
  last_name,
  status,
  role_id = 1,
}) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(400, 'User already exists!');
  }

  const role = await Role.findByPk(role_id);
  if (!role) {
    throw new ApiError(400, 'Invalid role ID!');
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
    user: {
      id: newUser.id,
      email: newUser.email,
      role_id: newUser.role_id,
    },
  };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid password');
  }

  const userRole = user.role_id;
  const token = jwt.sign({ id: user.id, role_id: userRole }, JWT_SECRET_KEY, {
    expiresIn: '1h',
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role_id: userRole,
    },
  };
};
