import { addEmployee } from '../controller/employee.controller.js';
import { checkRole } from '../util/index.js';
import { VerifyToken } from './../middleware/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/', VerifyToken, checkRole(['admin']), addEmployee)


export default router