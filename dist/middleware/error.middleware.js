"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const env_1 = require("../config/env");
const response_util_1 = require("../utils/response.util");
// Custom error class
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
// Handle different types of errors
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};
const handleJWTError = () => {
    return new AppError("Invalid token. Please log in again", 401);
};
const handleJWTExpiredError = () => {
    return new AppError("Your token has expired. Please log in again", 401);
};
// Send error response based on environment
const sendErrorDev = (err, res) => {
    response_util_1.ApiResponse.error({
        res,
        message: err.message,
        statusCode: err.statusCode,
        error: {
            status: err.statusCode,
            error: err,
            message: err.message,
            stack: err.stack,
        },
    });
};
const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        response_util_1.ApiResponse.error({
            res,
            message: err.message,
            statusCode: err.statusCode,
        });
    }
    // Programming or other unknown error: don't leak error details
    else {
        console.error("ERROR 💥", err);
        response_util_1.ApiResponse.error({
            res,
            message: "Something went wrong",
            statusCode: 500,
        });
    }
};
// Global error handling middleware
const errorHandler = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    if (env_1.ENV.app.nodeEnv === "development") {
        sendErrorDev(err, res);
    }
    else if (env_1.ENV.app.nodeEnv === "production") {
        let error = { ...err };
        error.message = err.message;
        // Mongoose errors handling
        if (err.name === "CastError")
            error = handleCastErrorDB(err);
        if (err.code === 11000)
            error = handleDuplicateFieldsDB(err);
        if (err.name === "ValidationError")
            error = handleValidationErrorDB(err);
        if (err.name === "JsonWebTokenError")
            error = handleJWTError();
        if (err.name === "TokenExpiredError")
            error = handleJWTExpiredError();
        sendErrorProd(error, res);
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map