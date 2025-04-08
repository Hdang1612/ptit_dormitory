import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

import {
  // fillContract,
  getContractlist,
  // getContracts,
  getContractById,
  createContract,
  updateContract,
  // deleteContract,
  // generateContractDoc,
  printRegistrationForm,
  printCancelForm,
} from '../controller/contractController.js';

const contractRoutes = express.Router();

contractRoutes.get(
  '/fill/:id',
  verifyToken,
  //   authorizeRoles(['user_read']),
  updateContract,
);

contractRoutes.put(
  '/update/:studentId',
  verifyToken,
  //   authorizeRoles(['user_read']),
  updateContract,
);

contractRoutes.get(
  '/fetchlist',
  verifyToken,
  //   authorizeRoles(['user_read']),
  getContractlist,
);

// Tạo file Word từ hợp đồng
contractRoutes.post('/create', createContract);
contractRoutes.get('/fetch/:id', verifyToken, getContractById);
contractRoutes.post('/generate-register-doc', printRegistrationForm);
contractRoutes.post('/generate-cancel-doc', printCancelForm);

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
