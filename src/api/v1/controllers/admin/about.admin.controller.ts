import type { Request, Response } from "express";
import { ApiResponse } from "../../../../utils/response.util";
import type { AboutAdminService } from "../../services/admin/about.admin.service";

class AboutAdminController {
  constructor(private readonly aboutAdminService: AboutAdminService) {}

  getAllAbouts = async (_: Request, res: Response) => {
    const abouts = await this.aboutAdminService.getAllAbouts();
    return ApiResponse.success({
      res,
      data: abouts,
      message: "Abouts fetched successfully",
      statusCode: abouts.status,
    });
  };
  createAbout = async (req: Request, res: Response) => {
    console.log(req.body);
    const about = await this.aboutAdminService.createAbout(req.body);
    return ApiResponse.success({
      res,
      data: about,
      message: "About created successfully",
      statusCode: about.status,
    });
  };
  updateAbout = async (req: Request, res: Response) => {
    const about = await this.aboutAdminService.updateAbout(
      req.params.slug,
      req.body
    );
    return ApiResponse.success({
      res,
      data: about,
      message: "About updated successfully",
      statusCode: about.status,
    });
  };
  toggleAboutStatus = async (req: Request, res: Response) => {
    const about = await this.aboutAdminService.toggleAboutStatus(
      req.params.slug
    );
    return ApiResponse.success({
      res,
      data: about,
      message: "About status toggled successfully",
      statusCode: about.status,
    });
  };

  getAboutBySlug = async (req: Request, res: Response) => {
    const about = await this.aboutAdminService.getAboutBySlug(req.params.slug);
    return ApiResponse.success({
      res,
      data: about,
      message: "About fetched successfully",
      statusCode: about.status,
    });
  };
}

export default AboutAdminController;
