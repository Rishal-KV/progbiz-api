"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialAdminController = void 0;
const response_util_1 = require("../../../../utils/response.util");
class TestimonialAdminController {
    constructor(testimonialAdminService) {
        this.testimonialAdminService = testimonialAdminService;
        this.getAllTestimonials = async (_, res) => {
            const testimonials = await this.testimonialAdminService.getAllTestimonials();
            return response_util_1.ApiResponse.success({
                res,
                data: testimonials,
                message: "Testimonials fetched successfully",
                statusCode: testimonials.status,
            });
        };
        this.createTestimonial = async (req, res) => {
            const testimonial = await this.testimonialAdminService.createTestimonial(req.body);
            return response_util_1.ApiResponse.success({
                res,
                data: testimonial,
                message: "Testimonial created successfully",
                statusCode: testimonial.status,
            });
        };
        this.updateTestimonial = async (req, res) => {
            const testimonial = await this.testimonialAdminService.updateTestimonial(req.params.id, req.body);
            return response_util_1.ApiResponse.success({
                res,
                data: testimonial,
                message: "Testimonial updated successfully",
                statusCode: testimonial.status,
            });
        };
        this.toggleTestimonialStatus = async (req, res) => {
            const testimonial = await this.testimonialAdminService.toggleTestimonialStatus(req.params.id);
            return response_util_1.ApiResponse.success({
                res,
                data: testimonial,
                message: "Testimonial status toggled successfully",
                statusCode: testimonial.status,
            });
        };
        this.getTestimonialById = async (req, res) => {
            const testimonial = await this.testimonialAdminService.getTestimonialById(req.params.id);
            return response_util_1.ApiResponse.success({
                res,
                data: testimonial,
                message: "Testimonial fetched successfully",
                statusCode: testimonial.status,
            });
        };
    }
}
exports.TestimonialAdminController = TestimonialAdminController;
//# sourceMappingURL=testimonials.controler.js.map