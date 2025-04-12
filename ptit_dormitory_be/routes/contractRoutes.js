import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

import {
  // fillContract,
  getContractlist,
  getContractById,
  createContract,
  updateContract,
  // generateContractDoc,
} from '../controller/contractController.js';

const contractRoutes = express.Router();

// contractRoutes.get(
//   '/fill/:id',
//   verifyToken,
//   //   authorizeRoles(['user_read']),
//   updateContract,
// );

contractRoutes.get('/fetchlist', verifyToken, getContractlist);
// Tạo file Word từ hợp đồng
contractRoutes.post('/create', createContract);
contractRoutes.put('/update/:studentId', verifyToken, updateContract);
contractRoutes.get('/fetch/:id', verifyToken, getContractById); // lấy hợp đồng khi login là admin
contractRoutes.get('/fetch/me', verifyToken, getContractById); // lấy hợp đồng khi login là student
// contractRoutes.post('/generate-register-doc', printRegistrationForm);
// contractRoutes.post('/generate-cancel-doc', printCancelForm);

export default contractRoutes;
