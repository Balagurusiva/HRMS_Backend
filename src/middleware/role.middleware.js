
import { sendResponse } from './../util/index.js';

export const checkRole = (roles) => (req, res, next) => {
    if (!roles.includes === req.user.role) {
        return sendResponse(res, 403, { message: 'Access denied' })
    }

    next();

}