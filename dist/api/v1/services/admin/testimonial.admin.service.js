"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialAdminService = void 0;
const slugify_1 = __importDefault(require("slugify"));
const http_status_config_1 = require("../../../../config/http-status.config");
const error_middleware_1 = require("../../../../middleware/error.middleware");
class TestimonialAdminService {
    constructor(testimonialModel) {
        this.testimonialModel = testimonialModel;
    }
    async getAllTestimonials() {
        try {
            const testimonials = await this.testimonialModel.find();
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
    async createTestimonial(testimonial) {
        try {
            const newTestimonial = await this.testimonialModel.create({
                ...testimonial,
                slug: (0, slugify_1.default)(testimonial.name),
            });
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: newTestimonial,
                message: "Testimonial created successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async updateTestimonial(id, testimonial) {
        try {
            const updatedTestimonial = await this.testimonialModel.findOneAndUpdate({ _id: id }, testimonial, {
                new: true,
            });
            if (!updatedTestimonial)
                throw new error_middleware_1.AppError("Testimonial not found", http_status_config_1.HTTP.NOT_FOUND);
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: updatedTestimonial,
                message: "Testimonial updated successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async toggleTestimonialStatus(id) {
        try {
            const testimonial = await this.testimonialModel.findOne({ _id: id });
            if (!testimonial)
                throw new error_middleware_1.AppError("Testimonial not found", http_status_config_1.HTTP.NOT_FOUND);
            testimonial.status =
                testimonial.status === "active" ? "inactive" : "active";
            await testimonial.save();
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: testimonial,
                message: "Testimonial status toggled successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async getTestimonialById(id) {
        try {
            const testimonial = await this.testimonialModel.findById(id);
            if (!testimonial)
                throw new error_middleware_1.AppError("Testimonial not found", http_status_config_1.HTTP.NOT_FOUND);
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: testimonial,
                message: "Testimonial fetched successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.TestimonialAdminService = TestimonialAdminService;
//# sourceMappingURL=testimonial.admin.service.js.map