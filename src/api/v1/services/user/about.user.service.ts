import { HTTP } from "../../../../config/http-status.config";
import { AppError } from "../../../../middleware/error.middleware";
import { AboutModel, type IAbout } from "../../../../models/about.model";
import type { ServiceResponse } from "../../../../typings";

export class AboutUserService {
  private aboutModel: typeof AboutModel = AboutModel;

  async getAllAbouts(): Promise<ServiceResponse<IAbout[]>> {
    try {
      const abouts = await this.aboutModel
        .find({
          status: "active",
        })
        .sort({ createdAt: -1 });
      return {
        status: HTTP.OK,
        success: true,
        data: abouts,
        message: "Abouts fetched successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }
}
