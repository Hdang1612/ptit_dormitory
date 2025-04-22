import { registerService, loginService,changePasswordService } from '../services/authServices.js';

export const register = async (req, res, next) => {
  try {
    const data = await registerService(req.body);
    res.status(201).json({
      success: true,
      message: 'Register successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await loginService(req.body);
    res.status(200).json({
      success: true,
      message: 'Login successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id; // Lấy từ middleware authenticate
    const { currentPassword, newPassword } = req.body;

    const result = await changePasswordService({ userId, currentPassword, newPassword });

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};