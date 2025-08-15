import slugify from "slugify";
import { HTTP } from "../../../../config/http-status.config";
import { AppError } from "../../../../middleware/error.middleware";
import type { FaqModel, IFaq } from "../../../../models/faq.model";

export class FaqAdminService {
  constructor(private readonly faqModel: typeof FaqModel) {}

  async getAllFaqs() {
    try {
      const faqs = await this.faqModel.find();
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

  async createFaq(faq: IFaq) {
    try {
      const newFaq = await this.faqModel.create({
        ...faq,
        slug: slugify(faq.question),
      });
      return {
        status: HTTP.OK,
        success: true,
        data: newFaq,
        message: "Faq created successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async updateFaq(slug: string, faq: IFaq) {
    try {
      const updatedFaq = await this.faqModel.findOneAndUpdate({ slug }, faq, {
        new: true,
      });
      if (!updatedFaq) throw new AppError("Faq not found", HTTP.NOT_FOUND);
      return {
        status: HTTP.OK,
        success: true,
        data: updatedFaq,
        message: "Faq updated successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async toggleFaqStatus(slug: string) {
    try {
      const faq = await this.faqModel.findOne({ slug });
      if (!faq) throw new AppError("Faq not found", HTTP.NOT_FOUND);
      faq.status = faq.status === "active" ? "inactive" : "active";
      await faq.save();
      return {
        status: HTTP.OK,
        success: true,
        data: faq,
        message: "Faq status toggled successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async getFaqById(slug: string) {
    try {
      const faq = await this.faqModel.findOne({ slug });
      if (!faq) throw new AppError("Faq not found", HTTP.NOT_FOUND);
      return {
        status: HTTP.OK,
        success: true,
        data: faq,
        message: "Faq fetched successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }
}
