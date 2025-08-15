import type { Request, Response } from "express";
import { HTTP } from "../../../../config/http-status.config";
import { catchAsync } from "../../../../utils/catch-async.util";
import { ApiResponse } from "../../../../utils/response.util";
import type { AboutUserService } from "../../services/user/about.user.service";
import type { FaqUserService } from "../../services/user/faq.user.service";
import type { HeroUserService } from "../../services/user/hero.user.service";
import type { TestimonialUserService } from "../../services/user/testimonials.user.service";
export default class LandingController {
  constructor(
    private testimonialUserService: TestimonialUserService,
    private faqUserService: FaqUserService,
    private heroUserService: HeroUserService,
    private aboutUserService: AboutUserService
  ) {}

  getAllFaqs = catchAsync(async (_: Request, res: Response) => {
    const faqs = await this.faqUserService.getAllFaqs();
    return ApiResponse.success({
      res,
      message: "Faqs fetched successfully",
      data: faqs,
      statusCode: HTTP.OK,
    });
  });

  getAllTestimonials = catchAsync(async (_: Request, res: Response) => {
    const testimonials = await this.testimonialUserService.getAllTestimonials();
    return ApiResponse.success({
      res,
      message: "Testimonials fetched successfully",
      data: testimonials,
      statusCode: HTTP.OK,
    });
  });

  getAllHeros = catchAsync(async (_: Request, res: Response) => {
    const heros = await this.heroUserService.getAllHeros();
    return ApiResponse.success({
      res,
      message: "Heros fetched successfully",
      data: heros,
      statusCode: HTTP.OK,
    });
  });

  getAllAbouts = catchAsync(async (_: Request, res: Response) => {
    const abouts = await this.aboutUserService.getAllAbouts();
    return ApiResponse.success({
      res,
      message: "Abouts fetched successfully",
      data: abouts,
      statusCode: HTTP.OK,
    });
  });
}
