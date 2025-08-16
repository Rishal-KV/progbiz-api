"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testimonial_model_1 = require("../../../../models/testimonial.model");
const testimonials_controler_1 = require("../../controllers/admin/testimonials.controler");
const testimonial_admin_service_1 = require("../../services/admin/testimonial.admin.service");
const testimonialAdminController = new testimonials_controler_1.TestimonialAdminController(new testimonial_admin_service_1.TestimonialAdminService(testimonial_model_1.TestimonialModel));
const testimonialAdminRouter = (0, express_1.Router)();
testimonialAdminRouter.get("/", testimonialAdminController.getAllTestimonials);
testimonialAdminRouter.post("/", testimonialAdminController.createTestimonial);
testimonialAdminRouter.put("/:id", testimonialAdminController.updateTestimonial);
testimonialAdminRouter.patch("/:id", testimonialAdminController.toggleTestimonialStatus);
testimonialAdminRouter.get("/:id", testimonialAdminController.getTestimonialById);
exports.default = testimonialAdminRouter;
//# sourceMappingURL=testimonial.admin.routes.js.map