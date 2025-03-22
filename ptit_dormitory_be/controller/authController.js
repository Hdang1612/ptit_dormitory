import { registerService, loginService } from '../services/authServices.js';

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
