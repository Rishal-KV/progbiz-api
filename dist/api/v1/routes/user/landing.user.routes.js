"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const landing_user_controller_1 = __importDefault(require("../../controllers/user/landing.user.controller"));
const about_user_service_1 = require("../../services/user/about.user.service");
const faq_user_service_1 = require("../../services/user/faq.user.service");
const hero_user_service_1 = require("../../services/user/hero.user.service");
const testimonials_user_service_1 = require("../../services/user/testimonials.user.service");
const landingRouter = express_1.default.Router();
const landingController = new landing_user_controller_1.default(new testimonials_user_service_1.TestimonialUserService(), new faq_user_service_1.FaqUserService(), new hero_user_service_1.HeroUserService(), new about_user_service_1.AboutUserService());
landingRouter.get("/faqs", landingController.getAllFaqs.bind(landingController));
landingRouter.get("/heros", landingController.getAllHeros.bind(landingController));
landingRouter.get("/testimonials", landingController.getAllTestimonials.bind(landingController));
landingRouter.get("/abouts", landingController.getAllAbouts.bind(landingController));
exports.default = landingRouter;
//# sourceMappingURL=landing.user.routes.js.map