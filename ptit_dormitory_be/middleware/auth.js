import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';

import { getPermissionService } from '../services/getPermissionService.js';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    // Header format: "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (error, data) => {
      if (error) return res.status(403).json({ message: 'Wrong token' });
      console.log('Decoded Token:', data);
      req.user = data;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeRoles = (requiredPermissions = []) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const userPermissions = await getPermissionService(req.user.role_id);
      console.log('Permission >>>', userPermissions);

      const hasPermission = requiredPermissions.some((perm) =>
        userPermissions.includes(perm),
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'No permission' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};
