import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

import {
  fillContract,
  getContractlist,
  // getContracts,
  // getContractById,
  // createContract,
  // updateContract,
  // deleteContract,
  generateContractDoc,
  downloadContractDoc,
} from '../controller/contractController.js';

const contractRoutes = express.Router();

contractRoutes.get(
  '/fill/:studentId',
  verifyToken,
  //   authorizeRoles(['user_read']),
  fillContract,
);

contractRoutes.get(
  '/fetchlist',
  verifyToken,
  //   authorizeRoles(['user_read']),
  getContractlist,
);

// Tạo file Word từ hợp đồng
contractRoutes.post('/:contractId/generate-doc', generateContractDoc);

// Tải file hợp đồng
contractRoutes.get('/:contractId/download', downloadContractDoc);

// contractRoutes.get(
//   '/',
//   verifyToken,
//   //   authorizeRoles(['user_read']),
//   fillContract,
// );
// contractRoutes.get(
//   '/fill/:studentId',
//   verifyToken,
//   //   authorizeRoles(['user_read']),
//   fillContract,
// );

export default contractRoutes;
