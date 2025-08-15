import slugify from "slugify";
import { HTTP } from "../../../../config/http-status.config";
import { AppError } from "../../../../middleware/error.middleware";
import type { AboutModel, IAbout } from "../../../../models/about.model";
import type { ServiceResponse } from "../../../../typings";

export class AboutAdminService {
  constructor(private readonly aboutModel: typeof AboutModel) {}

  async getAllAbouts(): Promise<ServiceResponse<IAbout[]>> {
    try {
      const abouts = await this.aboutModel.find();
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

  async createAbout(about: IAbout): Promise<ServiceResponse<IAbout>> {
    try {
      const { heading, description } = about;
      if (!heading || !description) {
        throw new AppError("Invalid about data", HTTP.BAD_REQUEST);
      }
      const newAbout = await this.aboutModel.create({
        heading,
        description,
        slug: slugify(heading),
      });
      return {
        status: HTTP.OK,
        success: true,
        data: newAbout,
        message: "About created successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async updateAbout(
    slug: string,
    about: IAbout
  ): Promise<ServiceResponse<IAbout>> {
    try {
      const updatedAbout = await this.aboutModel.findOneAndUpdate(
        { slug },
        about,
        {
          new: true,
        }
      );
      if (!updatedAbout) throw new AppError("About not found", HTTP.NOT_FOUND);
      return {
        status: HTTP.OK,
        success: true,
        data: updatedAbout,
        message: "About updated successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async toggleAboutStatus(slug: string): Promise<ServiceResponse<IAbout>> {
    try {
      const about = await this.aboutModel.findOne({ slug });
      if (!about) throw new AppError("About not found", HTTP.NOT_FOUND);
      about.status = about.status === "active" ? "inactive" : "active";
      await about.save();
      return {
        status: HTTP.OK,
        success: true,
        data: about,
        message: "About status toggled successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async getAboutBySlug(slug: string): Promise<ServiceResponse<IAbout>> {
    try {
      const about = await this.aboutModel.findOne({ slug });
      if (!about) throw new AppError("About not found", HTTP.NOT_FOUND);
      return {
        status: HTTP.OK,
        success: true,
        data: about,
        message: "About fetched successfully",
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  }
}
