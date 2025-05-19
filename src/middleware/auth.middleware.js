import jwt from 'jsonwebtoken';
import { sendResponse } from './../util/index.js';

export const VerifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        sendResponse(res, 401, { message: "Inavalid Token or Token Missing" })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        sendResponse(res, 403, { message: "Token Expired or Invalid" })
    }
}