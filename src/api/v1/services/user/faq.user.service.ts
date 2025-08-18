import { HTTP } from "../../../../config/http-status.config";
import { AppError } from "../../../../middleware/error.middleware";
import { FaqModel, type IFaq } from "../../../../models/faq.model";
import type { ServiceResponse } from "../../../../typings";
export class FaqUserService {
  private faqModel: typeof FaqModel = FaqModel;

  async getAllFaqs(): Promise<ServiceResponse<IFaq[]>> {
    try {
      const faqs = await this.faqModel
        .find({
          status: "active",
        })
        .sort({ createdAt: -1 });
      return {
        status: HTTP.OK,
        success: true,
        data: faqs,
        message: "Faqs fetched successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }
}
