"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../../../config/env");
const http_status_config_1 = require("../../../../config/http-status.config");
const error_middleware_1 = require("../../../../middleware/error.middleware");
const user_model_1 = require("../../../../models/user.model");
const auth_util_1 = require("../../../../utils/auth.util");
class UserAuthService {
    constructor() {
        this.jwtSecret = env_1.ENV.jwt.secret;
        this.userModel = user_model_1.UserModel;
    }
    generateToken(userId) {
        const expiresIn = env_1.ENV.jwt.expiresIn;
        const options = {
            expiresIn: expiresIn,
        };
        return jsonwebtoken_1.default.sign({ id: userId, type: "user" }, this.jwtSecret, options);
    }
    async login(params) {
        try {
            const user = await this.userModel.findOne({ email: params.email });
            if (!user) {
                throw new error_middleware_1.AppError("User not found", http_status_config_1.HTTP.NOT_FOUND);
            }
            const isPasswordMatched = await user.comparePassword(params.password);
            if (!isPasswordMatched) {
                throw new error_middleware_1.AppError("Invalid credentials", http_status_config_1.HTTP.UNAUTHORIZED);
            }
            const token = this.generateToken(user._id.toString());
            return {
                data: { token },
                message: "Login successful",
                status: http_status_config_1.HTTP.OK,
                success: true,
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async register(params) {
        try {
            const user = await this.userModel.findOne({ email: params.email });
            if (user)
                throw new error_middleware_1.AppError("User already exists", http_status_config_1.HTTP.CONFLICT);
            const hashedPassword = (0, auth_util_1.hashPassword)(params.password);
            const newUser = await this.userModel.create({
                email: params.email,
                password: hashedPassword,
                role: "user",
            });
            const token = this.generateToken(newUser._id.toString());
            return {
                data: { token },
                message: "Register successful",
                status: http_status_config_1.HTTP.CREATED,
                success: true,
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.UserAuthService = UserAuthService;
//# sourceMappingURL=auth.user.service.js.map