import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
} from '../controller/roleController.js';

const roleRoutes = express.Router();

roleRoutes.get(
  '/fetchlist',
  verifyToken,
  //   authorizeRoles(['user_read']),
  getAllRoles,
);
roleRoutes.get(
  '/fetch/:id',
  verifyToken,
  //   authorizeRoles(['user_read']),
  getRoleById,
);
roleRoutes.post(
  '/create',
  verifyToken,
  //   authorizeRoles(['user_create']),
  createRole,
);
roleRoutes.put(
  '/update/:id',
  verifyToken,
  //   authorizeRoles(['user_update']),
  updateRole,
);

export default roleRoutes;
