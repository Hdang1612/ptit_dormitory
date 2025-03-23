import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import areaRoutes from './areaRoute.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', verifyToken, authorizeRoles(['1', '2']), userRoutes);
router.use('/place', areaRoutes);

export default router;
