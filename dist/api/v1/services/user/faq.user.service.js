"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqUserService = void 0;
const http_status_config_1 = require("../../../../config/http-status.config");
const error_middleware_1 = require("../../../../middleware/error.middleware");
const faq_model_1 = require("../../../../models/faq.model");
class FaqUserService {
    constructor() {
        this.faqModel = faq_model_1.FaqModel;
    }
    async getAllFaqs() {
        try {
            const faqs = await this.faqModel.find().sort({ createdAt: -1 });
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: faqs,
                message: "Faqs fetched successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.FaqUserService = FaqUserService;
//# sourceMappingURL=faq.user.service.js.map