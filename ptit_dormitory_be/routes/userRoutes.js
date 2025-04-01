import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';
import upload from '../middleware/uploadUser.js';

import {
  updateUser,
  createUser,
  getUsersList,
  deleteUser,
  getUserById,
  importForeignStudent,
  importVnStudent,
  importStudentRooms,
} from '../controller/userController.js';

const userRoutes = express.Router();

userRoutes.get(
  '/fetch',
  verifyToken,
  authorizeRoles(['user_read']),
  getUsersList,
);
userRoutes.get(
  '/fetch/:id',
  verifyToken,
  authorizeRoles(['user_read']),
  getUserById,
);
userRoutes.post(
  '/create',
  verifyToken,
  authorizeRoles(['user_create']),
  createUser,
);
userRoutes.put(
  '/update/:id',
  verifyToken,
  authorizeRoles(['user_update']),
  updateUser,
);
userRoutes.delete(
  '/delete/:id',
  verifyToken,
  authorizeRoles(['user_delete']),
  deleteUser,
);
userRoutes.post('/importForeign', verifyToken, upload.single('file'), importForeignStudent);
userRoutes.post('/importVn', verifyToken, upload.single('file'), importVnStudent);
userRoutes.post(
  '/importroomstudent',
  verifyToken,
  upload.single('file'),
  importStudentRooms,
);

export default userRoutes;
