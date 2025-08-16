"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catch_async_util_1 = require("../../../../utils/catch-async.util");
const response_util_1 = require("../../../../utils/response.util");
const auth_admin_service_1 = __importDefault(require("../../services/admin/auth.admin.service"));
class AdminAuthController {
    constructor() {
        this.authService = new auth_admin_service_1.default();
        this.login = (0, catch_async_util_1.catchAsync)(async (req, res) => {
            const response = await this.authService.login({
                email: req.body.email,
                password: req.body.password,
            });
            return response_util_1.ApiResponse.success({
                res,
                message: response.message,
                data: response.data,
                statusCode: response.status,
            });
        });
    }
}
exports.default = AdminAuthController;
//# sourceMappingURL=auth.admin.controller.js.map