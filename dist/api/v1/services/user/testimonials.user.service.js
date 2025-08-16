"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialUserService = void 0;
const http_status_config_1 = require("../../../../config/http-status.config");
const error_middleware_1 = require("../../../../middleware/error.middleware");
const testimonial_model_1 = require("../../../../models/testimonial.model");
class TestimonialUserService {
    constructor() {
        this.testimonialModel = testimonial_model_1.TestimonialModel;
    }
    async getAllTestimonials() {
        try {
            const testimonials = await this.testimonialModel
                .find()
                .sort({ createdAt: -1 });
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: testimonials,
                message: "Testimonials fetched successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.TestimonialUserService = TestimonialUserService;
//# sourceMappingURL=testimonials.user.service.js.map