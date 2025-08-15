import express from "express";
import LandingController from "../../controllers/user/landing.user.controller";
import { AboutUserService } from "../../services/user/about.user.service";
import { FaqUserService } from "../../services/user/faq.user.service";
import { HeroUserService } from "../../services/user/hero.user.service";
import { TestimonialUserService } from "../../services/user/testimonials.user.service";

const landingRouter: express.Router = express.Router();

const landingController = new LandingController(
  new TestimonialUserService(),
  new FaqUserService(),
  new HeroUserService(),
  new AboutUserService()
);

landingRouter.get(
  "/faqs",
  landingController.getAllFaqs.bind(landingController)
);
landingRouter.get(
  "/heros",
  landingController.getAllHeros.bind(landingController)
);
landingRouter.get(
  "/testimonials",
  landingController.getAllTestimonials.bind(landingController)
);
landingRouter.get(
  "/abouts",
  landingController.getAllAbouts.bind(landingController)
);
export default landingRouter;
