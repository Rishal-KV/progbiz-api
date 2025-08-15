import type { Request, Response } from "express";
import { ApiResponse } from "../../../../utils/response.util";
import type { TestimonialAdminService } from "../../services/admin/testimonial.admin.service";
export class TestimonialAdminController {
  constructor(
    private readonly testimonialAdminService: TestimonialAdminService
  ) {}

  getAllTestimonials = async (_: Request, res: Response) => {
    const testimonials =
      await this.testimonialAdminService.getAllTestimonials();
    return ApiResponse.success({
      res,
      data: testimonials,
      message: "Testimonials fetched successfully",
      statusCode: testimonials.status,
    });
  };

  createTestimonial = async (req: Request, res: Response) => {
    const testimonial = await this.testimonialAdminService.createTestimonial(
      req.body
    );
    return ApiResponse.success({
      res,
      data: testimonial,
      message: "Testimonial created successfully",
      statusCode: testimonial.status,
    });
  };

  updateTestimonial = async (req: Request, res: Response) => {
    const testimonial = await this.testimonialAdminService.updateTestimonial(
      req.params.id,
      req.body
    );
    return ApiResponse.success({
      res,
      data: testimonial,
      message: "Testimonial updated successfully",
      statusCode: testimonial.status,
    });
  };

  toggleTestimonialStatus = async (req: Request, res: Response) => {
    const testimonial =
      await this.testimonialAdminService.toggleTestimonialStatus(req.params.id);
    return ApiResponse.success({
      res,
      data: testimonial,
      message: "Testimonial status toggled successfully",
      statusCode: testimonial.status,
    });
  };

  getTestimonialById = async (req: Request, res: Response) => {
    const testimonial = await this.testimonialAdminService.getTestimonialById(
      req.params.id
    );
    return ApiResponse.success({
      res,
      data: testimonial,
      message: "Testimonial fetched successfully",
      statusCode: testimonial.status,
    });
  };
}
