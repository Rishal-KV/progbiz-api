import { Router } from "express";
import { TestimonialModel } from "../../../../models/testimonial.model";
import { TestimonialAdminController } from "../../controllers/admin/testimonials.controler";
import { TestimonialAdminService } from "../../services/admin/testimonial.admin.service";

const testimonialAdminController = new TestimonialAdminController(
  new TestimonialAdminService(TestimonialModel)
);
const testimonialAdminRouter = Router();

testimonialAdminRouter.get("/", testimonialAdminController.getAllTestimonials);
testimonialAdminRouter.post("/", testimonialAdminController.createTestimonial);
testimonialAdminRouter.put(
  "/:id",
  testimonialAdminController.updateTestimonial
);
testimonialAdminRouter.patch(
  "/:id",
  testimonialAdminController.toggleTestimonialStatus
);
testimonialAdminRouter.get(
  "/:id",
  testimonialAdminController.getTestimonialById
);

export default testimonialAdminRouter;
