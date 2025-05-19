export const sendResponse = (res, statusCode, message = {}) => {
    return res.status(statusCode).json(message)
}

export const checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return sendResponse(res, 403, { message: 'Access denied' })
    }
    next();
}

