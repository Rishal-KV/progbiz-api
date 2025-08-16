"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catch_async_util_1 = require("../../../../utils/catch-async.util");
const response_util_1 = require("../../../../utils/response.util");
const auth_user_service_1 = require("../../services/user/auth.user.service");
class AuthController {
    constructor() {
        this.authService = new auth_user_service_1.UserAuthService();
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
        this.register = (0, catch_async_util_1.catchAsync)(async (req, res) => {
            const response = await this.authService.register({
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
exports.default = AuthController;
//# sourceMappingURL=auth.user.controller.js.map