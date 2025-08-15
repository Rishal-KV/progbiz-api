import type { Request, Response } from "express";
import { ApiResponse } from "../../../../utils/response.util";
import type { FaqAdminService } from "../../services/admin/faq.admin.service";

class FaqAdminController {
  constructor(private readonly faqAdminService: FaqAdminService) {}

  getAllFaqs = async (_: Request, res: Response) => {
    const faqs = await this.faqAdminService.getAllFaqs();
    return ApiResponse.success({
      res,
      data: faqs,
      message: "Faqs fetched successfully",
      statusCode: faqs.status,
    });
  };
  createFaq = async (req: Request, res: Response) => {
    const faq = await this.faqAdminService.createFaq(req.body);
    return ApiResponse.success({
      res,
      data: faq,
      message: "Faq created successfully",
      statusCode: faq.status,
    });
  };
  updateFaq = async (req: Request, res: Response) => {
    const faq = await this.faqAdminService.updateFaq(req.params.slug, req.body);
    return ApiResponse.success({
      res,
      data: faq,
      message: "Faq updated successfully",
      statusCode: faq.status,
    });
  };
  toggleFaqStatus = async (req: Request, res: Response) => {
    const faq = await this.faqAdminService.toggleFaqStatus(req.params.slug);
    return ApiResponse.success({
      res,
      data: faq,
      message: "Faq status toggled successfully",
      statusCode: faq.status,
    });
  };

  getFaqBySlug = async (req: Request, res: Response) => {
    const faq = await this.faqAdminService.getFaqById(req.params.slug);

    return ApiResponse.success({
      res,
      data: faq,
      message: "Faq fetched successfully",
      statusCode: faq.status,
    });
  };
}

export default FaqAdminController;
