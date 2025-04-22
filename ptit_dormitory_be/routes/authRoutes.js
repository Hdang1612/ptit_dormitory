import express from 'express';
import {
  register,
  login,
  changePassword,
} from '../controller/authController.js';
import { verifyToken } from '../middleware/auth.js';

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/resetpassword',verifyToken, changePassword);

export default authRoutes;
