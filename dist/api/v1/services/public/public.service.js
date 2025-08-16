"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_config_1 = require("../../../../config/http-status.config");
class PublicService {
    async findTermsAndConditions() {
        try {
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: {},
                message: "Terms and Conditions fetched successfully",
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
exports.default = PublicService;
//# sourceMappingURL=public.service.js.map