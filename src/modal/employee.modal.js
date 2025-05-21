import pool from "../config/db.config.js";
import { sendResponse } from "../util/index.js";

export const getAllEmployee = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM employees');
        return rows;
    } catch (error) {
        console.error("error on getAllEmployee Modal", error);
        throw error;
    }
}

export const getEmployeeById = async (id) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM employees WHERE id = ?", [id])
        return rows[0];
    } catch (error) {
        console.error("error on getEmployeeById Modal", error);
        throw error;
    }
}

export const createEmployee = async (data) => {
    try {
        const { name, email, position } = data;
        const [result] = await pool.execute('INSERT INTO employees (name, email, position) values (?, ?, ?)', [name, email, position])
        return result.insertId
    } catch (error) {
        console.error("error on createEmployee modal", error);
        throw error
    }
}

export const editEmployee = async (id, data) => {
    try {
        const { email, name, position } = data;
        await pool.execute('UPDATE employees SET email = ?,  name = ?, position = ?  WHERE id = ? ', [email, name, position, id])
    } catch (error) {
        console.error("error on editEmployee", error);
        throw error;
    }
}

export const deleteEmployee = async (id) => {
    try {
        await pool.execute('DELETE  FROM employees WHERE id = ?', [id])
    } catch (error) {
        console.log("error on deleteEmployee", error);
        throw error;
    }
}