import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', verifyToken, authorizeRoles(['1', '2']), userRoutes);

export default router;
