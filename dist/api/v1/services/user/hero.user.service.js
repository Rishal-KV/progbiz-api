"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroUserService = void 0;
const http_status_config_1 = require("../../../../config/http-status.config");
const error_middleware_1 = require("../../../../middleware/error.middleware");
const hero_model_1 = require("../../../../models/hero.model");
class HeroUserService {
    constructor() {
        this.heroModel = hero_model_1.HeroModel;
    }
    async getAllHeros() {
        try {
            const heros = await this.heroModel.find().sort({ createdAt: -1 });
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: heros,
                message: "Heros fetched successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.HeroUserService = HeroUserService;
//# sourceMappingURL=hero.user.service.js.map