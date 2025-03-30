import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import areaRoutes from './areaRoute.js';
import roleRoutes from './roleRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/place', areaRoutes);
router.use('/role', roleRoutes);


export default router;
