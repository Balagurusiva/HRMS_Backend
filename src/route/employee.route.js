import { addEmployee, getEmployee, getEmployees, removeEmployee, updateEmployee } from '../controller/employee.controller.js';
import { checkRole } from '../util/index.js';
import { VerifyToken } from './../middleware/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/', VerifyToken, checkRole(['admin']), addEmployee)
router.get('/', VerifyToken, checkRole(['admin']), getEmployees)
router.get('/:id', VerifyToken, checkRole(['admin']), getEmployee)
router.put('/:id', VerifyToken, checkRole(['admin']), updateEmployee)
router.delete('/:id', VerifyToken, checkRole(['admin']), removeEmployee)


export default router