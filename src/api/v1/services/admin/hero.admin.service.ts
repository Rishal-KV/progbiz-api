import slugify from "slugify";
import { HTTP } from "../../../../config/http-status.config";
import { AppError } from "../../../../middleware/error.middleware";
import type { IHero } from "../../../../models/hero.model";
import { HeroModel } from "../../../../models/hero.model";
import type { ServiceResponse } from "../../../../typings";
import { deleteImageFromCloudinary } from "../../../../utils/cloudinary";

export class HeroAdminService {
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

  async createHero(
    hero: IHero,
    file: Express.Multer.File
  ): Promise<ServiceResponse<IHero>> {
    try {
      const newHero = await this.heroModel.create({
        title: hero.title,
        subtitle: hero.subtitle,
        image: {
          public_id: file?.filename,
          secure_url: file?.path,
        },
        slug: slugify(hero.title),
      });
      return {
        status: HTTP.OK,
        success: true,
        data: newHero,
        message: "Hero created successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async getHeroBySlug(slug: string): Promise<ServiceResponse<IHero>> {
    try {
      const hero = await this.heroModel.findOne({ slug });
      if (!hero) throw new AppError("Hero not found", HTTP.NOT_FOUND);
      return {
        status: HTTP.OK,
        success: true,
        data: hero,
        message: "Hero fetched successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async updateHero(
    slug: string,
    hero: IHero,
    file?: Express.Multer.File
  ): Promise<ServiceResponse<IHero>> {
    try {
      const updateData: Partial<IHero> = {
        ...hero,
      };
      console.log({ file });
      // ✅ Only update image if a new file is uploaded
      if (file) {
        updateData.image = {
          public_id: file.filename,
          secure_url: file.path,
        };
      }

      const updatedHero = await this.heroModel.findOneAndUpdate(
        { slug },
        updateData,
        { new: true }
      );

      // ✅ Delete old image only if new one was uploaded
      if (file && hero.oldImagePublicId) {
        await deleteImageFromCloudinary(hero.oldImagePublicId).catch(
          (error) => {
            console.log(error);
          }
        );
      }

      if (!updatedHero) throw new AppError("Hero not found", HTTP.NOT_FOUND);

      return {
        status: HTTP.OK,
        success: true,
        data: updatedHero,
        message: "Hero updated successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async toggleHeroStatus(slug: string): Promise<ServiceResponse<IHero>> {
    try {
      const hero = await this.heroModel.findOne({ slug });
      if (!hero) throw new AppError("Hero not found", HTTP.NOT_FOUND);
      hero.status = hero.status === "active" ? "inactive" : "active";
      await hero.save();
      return {
        status: HTTP.OK,
        success: true,
        data: hero,
        message: "Hero status toggled successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }
}
