"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutUserService = void 0;
const http_status_config_1 = require("../../../../config/http-status.config");
const error_middleware_1 = require("../../../../middleware/error.middleware");
const about_model_1 = require("../../../../models/about.model");
class AboutUserService {
    constructor() {
        this.aboutModel = about_model_1.AboutModel;
    }
    async getAllAbouts() {
        try {
            const abouts = await this.aboutModel.find().sort({ createdAt: -1 });
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: abouts,
                message: "Abouts fetched successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.AboutUserService = AboutUserService;
//# sourceMappingURL=about.user.service.js.map