"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_util_1 = require("../../../../utils/response.util");
class FaqAdminController {
    constructor(faqAdminService) {
        this.faqAdminService = faqAdminService;
        this.getAllFaqs = async (_, res) => {
            const faqs = await this.faqAdminService.getAllFaqs();
            return response_util_1.ApiResponse.success({
                res,
                data: faqs,
                message: "Faqs fetched successfully",
                statusCode: faqs.status,
            });
        };
        this.createFaq = async (req, res) => {
            const faq = await this.faqAdminService.createFaq(req.body);
            return response_util_1.ApiResponse.success({
                res,
                data: faq,
                message: "Faq created successfully",
                statusCode: faq.status,
            });
        };
        this.updateFaq = async (req, res) => {
            const faq = await this.faqAdminService.updateFaq(req.params.slug, req.body);
            return response_util_1.ApiResponse.success({
                res,
                data: faq,
                message: "Faq updated successfully",
                statusCode: faq.status,
            });
        };
        this.toggleFaqStatus = async (req, res) => {
            const faq = await this.faqAdminService.toggleFaqStatus(req.params.slug);
            return response_util_1.ApiResponse.success({
                res,
                data: faq,
                message: "Faq status toggled successfully",
                statusCode: faq.status,
            });
        };
        this.getFaqBySlug = async (req, res) => {
            const faq = await this.faqAdminService.getFaqById(req.params.slug);
            return response_util_1.ApiResponse.success({
                res,
                data: faq,
                message: "Faq fetched successfully",
                statusCode: faq.status,
            });
        };
    }
}
exports.default = FaqAdminController;
//# sourceMappingURL=faq.admin.controller.js.map