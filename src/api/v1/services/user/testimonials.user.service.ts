import { HTTP } from "../../../../config/http-status.config";
import { AppError } from "../../../../middleware/error.middleware";
import {
  type ITestimonial,
  TestimonialModel,
} from "../../../../models/testimonial.model";
import type { ServiceResponse } from "../../../../typings";

export class TestimonialUserService {
  private testimonialModel: typeof TestimonialModel = TestimonialModel;

  async getAllTestimonials(): Promise<ServiceResponse<ITestimonial[]>> {
    try {
      const testimonials = await this.testimonialModel
        .find()
        .sort({ createdAt: -1 });
      return {
        status: HTTP.OK,
        success: true,
        data: testimonials,
        message: "Testimonials fetched successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }
}
