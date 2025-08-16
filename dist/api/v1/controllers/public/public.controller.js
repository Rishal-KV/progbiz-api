"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catch_async_util_1 = require("../../../../utils/catch-async.util");
const response_util_1 = require("../../../../utils/response.util");
const public_service_1 = __importDefault(require("../../services/public/public.service"));
class PublicController {
    constructor() {
        this.publicService = new public_service_1.default();
        this.findTermsAndConditions = (0, catch_async_util_1.catchAsync)(async (_req, res) => {
            const response = await this.publicService.findTermsAndConditions();
            return response_util_1.ApiResponse.success({
                res,
                message: response.message,
                data: response.data,
                statusCode: response.status,
            });
        });
    }
}
exports.default = PublicController;
//# sourceMappingURL=public.controller.js.map