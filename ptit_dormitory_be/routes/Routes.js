import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;
