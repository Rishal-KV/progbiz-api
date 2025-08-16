"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_user_controller_1 = __importDefault(require("../../controllers/user/auth.user.controller"));
const landing_user_routes_1 = __importDefault(require("./landing.user.routes"));
const userRoutes = express_1.default.Router();
// Auth routes
// // Protected routes
const authController = new auth_user_controller_1.default();
userRoutes.post("/auth/login", authController.login.bind(authController));
userRoutes.post("/auth/register", authController.register.bind(authController));
userRoutes.use("/landing", landing_user_routes_1.default);
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map