import bcrypt from 'bcryptjs';

import User from '../models/Users.js';

import ApiError from '../utils/apiError.js';

export const updateUserService = async (userId, updateData) => {
  try {
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
    return { success: true, user  };
  } catch (error) {
    throw new Error(error.message);
  }
};
