import { HTTP } from "../../../../config/http-status.config";
import { AppError } from "../../../../middleware/error.middleware";
import { HeroModel, type IHero } from "../../../../models/hero.model";
import type { ServiceResponse } from "../../../../typings";
export class HeroUserService {
  private heroModel: typeof HeroModel = HeroModel;

  async getAllHeros(): Promise<ServiceResponse<IHero[]>> {
    try {
      const heros = await this.heroModel.find().sort({ createdAt: -1 });
      return {
        status: HTTP.OK,
        success: true,
        data: heros,
        message: "Heros fetched successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }
}
