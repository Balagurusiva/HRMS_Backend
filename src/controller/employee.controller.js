import { createEmployee } from "../modal/employee.modal.js"
import { sendResponse } from './../util/index.js';

export const addEmployee = async (req, res, next) => {
    const id = await createEmployee(req.body)
    sendResponse(res, 200, { message: "employee created successfully", id })
}