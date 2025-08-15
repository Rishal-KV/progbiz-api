import slugify from "slugify";
import { HTTP } from "../../../../config/http-status.config";
import { AppError } from "../../../../middleware/error.middleware";
import type {
  ITestimonial,
  TestimonialModel,
} from "../../../../models/testimonial.model";
import type { ServiceResponse } from "../../../../typings";

export class TestimonialAdminService {
  constructor(private readonly testimonialModel: typeof TestimonialModel) {}

  async getAllTestimonials(): Promise<ServiceResponse<ITestimonial[]>> {
    try {
      const testimonials = await this.testimonialModel.find();
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

  async createTestimonial(
    testimonial: ITestimonial
  ): Promise<ServiceResponse<ITestimonial>> {
    try {
      const newTestimonial = await this.testimonialModel.create({
        ...testimonial,
        slug: slugify(testimonial.name),
      });
      return {
        status: HTTP.OK,
        success: true,
        data: newTestimonial,
        message: "Testimonial created successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTestimonial(
    id: string,
    testimonial: ITestimonial
  ): Promise<ServiceResponse<ITestimonial>> {
    try {
      const updatedTestimonial = await this.testimonialModel.findOneAndUpdate(
        { _id: id },
        testimonial,
        {
          new: true,
        }
      );
      if (!updatedTestimonial)
        throw new AppError("Testimonial not found", HTTP.NOT_FOUND);
      return {
        status: HTTP.OK,
        success: true,
        data: updatedTestimonial,
        message: "Testimonial updated successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }
  async toggleTestimonialStatus(
    id: string
  ): Promise<ServiceResponse<ITestimonial>> {
    try {
      const testimonial = await this.testimonialModel.findOne({ _id: id });
      if (!testimonial)
        throw new AppError("Testimonial not found", HTTP.NOT_FOUND);
      testimonial.status =
        testimonial.status === "active" ? "inactive" : "active";
      await testimonial.save();
      return {
        status: HTTP.OK,
        success: true,
        data: testimonial,
        message: "Testimonial status toggled successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async getTestimonialById(id: string): Promise<ServiceResponse<ITestimonial>> {
    try {
      const testimonial = await this.testimonialModel.findById(id);
      if (!testimonial)
        throw new AppError("Testimonial not found", HTTP.NOT_FOUND);
      return {
        status: HTTP.OK,
        success: true,
        data: testimonial,
        message: "Testimonial fetched successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }
}
