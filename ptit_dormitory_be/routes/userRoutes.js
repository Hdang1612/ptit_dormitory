import express from 'express';
import { updateUser } from '../controller/userController.js';

const userRoutes = express.Router();

userRoutes.put('/update/:id', updateUser);

export default userRoutes;
