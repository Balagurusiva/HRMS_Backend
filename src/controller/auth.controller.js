import pool from "../config/db.config.js";
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendResponse } from './../util/index.js';

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const [existingUser] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])

        if (existingUser.length > 0) {
            sendResponse(res, 400, { message: "User already exist" })
        }

        const hashedPassword = await bycrpt.hash(password, 10)

        await pool.execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ? )', [name, email, hashedPassword, role])

        sendResponse(res, 201, { message: "User Created Successfully" })

    } catch (error) {
        console.log("error on register", error);
        sendResponse(res, 500, { message: 'Server error', error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email == '' && password == '') return sendResponse(res, 400, { message: "Invalid input" });

        let [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])

        if (users.length === 0) {
            return sendResponse(res, 404, { message: "User not avilable" })
        }

        const user = users[0]
        const isMatch = await bycrpt.compare(password, user.password)
        if (!isMatch) {
            return sendResponse(res, 401, { message: "Invalid Password" })
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )


        return sendResponse(res, 200, {
            message: "Login successfull",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        })


    } catch (error) {
        console.log("error on login", error);
        sendResponse(res, 500, { message: 'Server error', error: error.message })
    }
}