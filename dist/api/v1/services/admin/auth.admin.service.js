"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../../../config/env");
const http_status_config_1 = require("../../../../config/http-status.config");
const error_middleware_1 = require("../../../../middleware/error.middleware");
const user_model_1 = require("../../../../models/user.model");
class AdminAuthService {
    constructor() {
        this.userModel = user_model_1.UserModel;
        this.jwtSecret = env_1.ENV.jwt.secret;
    }
    async login({ email, password, }) {
        try {
            const user = await this.userModel.findOne({ email, role: "admin" });
            if (!user)
                throw new error_middleware_1.AppError("User not found", 404);
            const isPasswordMatched = await user.comparePassword(password);
            if (!isPasswordMatched)
                throw new error_middleware_1.AppError("Invalid credentials", 401);
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
            throw new error_middleware_1.AppError(error.message, 500);
        }
    }
    generateToken(userId) {
        const expiresIn = env_1.ENV.jwt.expiresIn || "7d";
        const options = {
            expiresIn: expiresIn,
        };
        return jsonwebtoken_1.default.sign({ id: userId, type: "admin" }, this.jwtSecret, options);
    }
}
exports.default = AdminAuthService;
//# sourceMappingURL=auth.admin.service.js.map