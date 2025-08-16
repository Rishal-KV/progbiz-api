"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqAdminService = void 0;
const slugify_1 = __importDefault(require("slugify"));
const http_status_config_1 = require("../../../../config/http-status.config");
const error_middleware_1 = require("../../../../middleware/error.middleware");
class FaqAdminService {
    constructor(faqModel) {
        this.faqModel = faqModel;
    }
    async getAllFaqs() {
        try {
            const faqs = await this.faqModel.find();
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
    async createFaq(faq) {
        try {
            const newFaq = await this.faqModel.create({
                ...faq,
                slug: (0, slugify_1.default)(faq.question),
            });
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: newFaq,
                message: "Faq created successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async updateFaq(slug, faq) {
        try {
            const updatedFaq = await this.faqModel.findOneAndUpdate({ slug }, faq, {
                new: true,
            });
            if (!updatedFaq)
                throw new error_middleware_1.AppError("Faq not found", http_status_config_1.HTTP.NOT_FOUND);
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: updatedFaq,
                message: "Faq updated successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async toggleFaqStatus(slug) {
        try {
            const faq = await this.faqModel.findOne({ slug });
            if (!faq)
                throw new error_middleware_1.AppError("Faq not found", http_status_config_1.HTTP.NOT_FOUND);
            faq.status = faq.status === "active" ? "inactive" : "active";
            await faq.save();
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: faq,
                message: "Faq status toggled successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async getFaqById(slug) {
        try {
            const faq = await this.faqModel.findOne({ slug });
            if (!faq)
                throw new error_middleware_1.AppError("Faq not found", http_status_config_1.HTTP.NOT_FOUND);
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: faq,
                message: "Faq fetched successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.FaqAdminService = FaqAdminService;
//# sourceMappingURL=faq.admin.service.js.map