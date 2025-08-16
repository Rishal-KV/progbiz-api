"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_admin_controller_1 = __importDefault(require("../../controllers/admin/auth.admin.controller"));
const adminAuthRouter = express_1.default.Router();
const adminAuthController = new auth_admin_controller_1.default();
// ===>  v1/admin/auth/
adminAuthRouter.post("/login", (req, res, next) => adminAuthController.login(req, res, next));
exports.default = adminAuthRouter;
//# sourceMappingURL=auth.admin.routes.js.map