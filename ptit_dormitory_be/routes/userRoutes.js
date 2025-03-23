import express from 'express';
import {
  updateUser,
  createUser,
  getUsersList,
  deleteUser,
  getUserById,
} from '../controller/userController.js';

const userRoutes = express.Router();

userRoutes.get('/fetch', getUsersList);
userRoutes.get('/fetch/:id', getUserById);
userRoutes.post('/create', createUser);
userRoutes.put('/update/:id', updateUser);
userRoutes.delete('/delete/:id', deleteUser);

export default userRoutes;
