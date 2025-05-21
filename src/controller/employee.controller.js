import pool from "../config/db.config.js";
import { createEmployee, getEmployeeById, getAllEmployee, editEmployee, deleteEmployee } from "../modal/employee.modal.js"
import { sendResponse } from './../util/index.js';

export const addEmployee = async (req, res, next) => {
    const [existingEmployee] = await pool.execute('SELECT * FROM employees WHERE email = ?', [req.body.email])
    if (existingEmployee.length > 0) {
        return sendResponse(res, 200, { message: "Employee already exist with this email" })
    }
    const id = await createEmployee(req.body)
    sendResponse(res, 200, { message: "employee created successfully", id })
}

export const getEmployees = async (req, res, next) => {
    const employees = await getAllEmployee()
    sendResponse(res, 200, { data: employees })
}

export const getEmployee = async (req, res, next) => {
    const id = req.params.id
    const employee = await getEmployeeById(id)
    sendResponse(res, 200, { data: employee })
}

export const updateEmployee = async (req, res, next) => {
    await editEmployee(req.params.id, req.body)
    sendResponse(res, 200, { message: "Employee updated" })
}

export const removeEmployee = async (req, res, next) => {
    await deleteEmployee(req.params.id)
    sendResponse(res, 200, { message: "Employee Removed Successfully" })
}