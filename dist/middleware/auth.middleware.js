"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenInfo = exports.validateRole = exports.restrictTo = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const user_model_1 = require("../models/user.model");
const response_util_1 = require("../utils/response.util");
// Verify JWT token
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token)
            return response_util_1.ApiResponse.unauthorized({
                res,
                message: "Not authorized to access this route",
            });
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.jwt.secret);
            const { id } = decoded;
            const user = await user_model_1.UserModel.findById(id);
            if (!user) {
                return response_util_1.ApiResponse.unauthorized({
                    res,
                    message: "User not found",
                });
            }
            req.user = user;
            // req.userType = user.role;
            next();
        }
        catch (_error) {
            return response_util_1.ApiResponse.unauthorized({
                res,
                message: "Not authorized to access this route",
            });
        }
    }
    catch (_error) {
        next(_error);
    }
};
exports.protect = protect;
// Restrict routes based on user role
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user)
            return response_util_1.ApiResponse.unauthorized({
                res,
                message: "User not authenticated",
            });
        if (!roles.includes(req.userType)) {
            return response_util_1.ApiResponse.forbidden({
                res,
                message: "You do not have permission to perform this action",
            });
        }
        next();
    };
};
exports.restrictTo = restrictTo;
const validateRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return response_util_1.ApiResponse.unauthorized({
                res,
                message: "User not authenticated",
            });
        }
        if (!roles.includes(req.user.role)) {
            return response_util_1.ApiResponse.forbidden({
                res,
                message: "You do not have permission to perform this action",
            });
        }
        next();
    };
};
exports.validateRole = validateRole;
const getTokenInfo = (req) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return false;
        const decodedToken = jsonwebtoken_1.default.verify(token, env_1.ENV.jwt.secret);
        return decodedToken;
    }
    catch (error) {
        console.log({ "TOKEN ERROR": error });
        return false;
    }
};
exports.getTokenInfo = getTokenInfo;
//# sourceMappingURL=auth.middleware.js.map