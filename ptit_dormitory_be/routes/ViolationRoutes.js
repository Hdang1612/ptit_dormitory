import express from "express";
import { verifyToken, authorizeRoles} from "../middleware/auth.js";
import { createViolation,getViolations } from "../controller/studentViolationController.js";

const violationRoutes=express.Router()
violationRoutes.post('/create',verifyToken,createViolation)
violationRoutes.get('/fetch',verifyToken,getViolations)

export default violationRoutes