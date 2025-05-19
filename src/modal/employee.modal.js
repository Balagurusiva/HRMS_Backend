import pool from "../config/db.config.js";

export const getAllEmployee = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM employee');
        return rows;
    } catch (error) {
        console.error("error on getAllEmployee Modal", error);
    }
}

export const getEmployeeById = async (id) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM employee WHERE id = ?", [id])
        return rows[0];
    } catch (error) {
        console.error("error on getEmployeeById Modal", error);
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