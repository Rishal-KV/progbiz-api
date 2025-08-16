"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_config_1 = require("../../../../config/http-status.config");
const catch_async_util_1 = require("../../../../utils/catch-async.util");
const response_util_1 = require("../../../../utils/response.util");
class LandingController {
    constructor(testimonialUserService, faqUserService, heroUserService, aboutUserService) {
        this.testimonialUserService = testimonialUserService;
        this.faqUserService = faqUserService;
        this.heroUserService = heroUserService;
        this.aboutUserService = aboutUserService;
        this.getAllFaqs = (0, catch_async_util_1.catchAsync)(async (_, res) => {
            const faqs = await this.faqUserService.getAllFaqs();
            return response_util_1.ApiResponse.success({
                res,
                message: "Faqs fetched successfully",
                data: faqs,
                statusCode: http_status_config_1.HTTP.OK,
            });
        });
        this.getAllTestimonials = (0, catch_async_util_1.catchAsync)(async (_, res) => {
            const testimonials = await this.testimonialUserService.getAllTestimonials();
            return response_util_1.ApiResponse.success({
                res,
                message: "Testimonials fetched successfully",
                data: testimonials,
                statusCode: http_status_config_1.HTTP.OK,
            });
        });
        this.getAllHeros = (0, catch_async_util_1.catchAsync)(async (_, res) => {
            const heros = await this.heroUserService.getAllHeros();
            return response_util_1.ApiResponse.success({
                res,
                message: "Heros fetched successfully",
                data: heros,
                statusCode: http_status_config_1.HTTP.OK,
            });
        });
        this.getAllAbouts = (0, catch_async_util_1.catchAsync)(async (_, res) => {
            const abouts = await this.aboutUserService.getAllAbouts();
            return response_util_1.ApiResponse.success({
                res,
                message: "Abouts fetched successfully",
                data: abouts,
                statusCode: http_status_config_1.HTTP.OK,
            });
        });
    }
}
exports.default = LandingController;
//# sourceMappingURL=landing.user.controller.js.map