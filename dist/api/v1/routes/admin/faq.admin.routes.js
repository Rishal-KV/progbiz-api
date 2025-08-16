"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faq_model_1 = require("../../../../models/faq.model");
const faq_admin_controller_1 = __importDefault(require("../../controllers/admin/faq.admin.controller"));
const faq_admin_service_1 = require("../../services/admin/faq.admin.service");
const faqAdminController = new faq_admin_controller_1.default(new faq_admin_service_1.FaqAdminService(faq_model_1.FaqModel));
const faqAdminRouter = (0, express_1.Router)();
faqAdminRouter.get("/", faqAdminController.getAllFaqs);
faqAdminRouter.post("/", faqAdminController.createFaq);
faqAdminRouter.put("/:slug", faqAdminController.updateFaq);
faqAdminRouter.patch("/:slug", faqAdminController.toggleFaqStatus);
faqAdminRouter.get("/:slug", faqAdminController.getFaqBySlug);
exports.default = faqAdminRouter;
//# sourceMappingURL=faq.admin.routes.js.map