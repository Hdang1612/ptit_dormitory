import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import areaRoutes from './areaRoute.js';
import roleRoutes from './roleRoutes.js';
import contractRoutes from './contractRoutes.js';
import shiftScheduleRoute from './shiftScheduleRoute.js';
import attendanceRoute from './attendanceRoute.js';
import reportRoute from './reportRoute.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/place', areaRoutes);
router.use('/role', roleRoutes);
router.use('/contract', contractRoutes);
router.use('/shiftSchedule', shiftScheduleRoute);
router.use('/attendance', attendanceRoute);
router.use('/report', reportRoute);
export default router;
