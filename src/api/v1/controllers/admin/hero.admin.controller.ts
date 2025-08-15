import type { Request, Response } from "express";
import { ApiResponse } from "../../../../utils/response.util";
import type { HeroAdminService } from "../../services/admin/hero.admin.service";

export class HeroAdminController {
  constructor(private readonly heroAdminService: HeroAdminService) {}

  getAllHeros = async (_: Request, res: Response) => {
    const heros = await this.heroAdminService.getAllHeros();
    return ApiResponse.success({
      res,
      data: heros,
      message: "Heros fetched successfully",
      statusCode: res.statusCode,
    });
  };

  createHero = async (req: Request, res: Response) => {
    const { file } = req;
    console.log(file);
    const hero = await this.heroAdminService.createHero(
      req.body,
      file as Express.Multer.File
    );
    return ApiResponse.success({
      res,
      data: hero,
      message: "Hero created successfully",
      statusCode: res.statusCode,
    });
  };

  updateHero = async (req: Request, res: Response) => {
    const hero = await this.heroAdminService.updateHero(
      req.params.slug,
      req.body,
      req.file as Express.Multer.File
    );
    console.log(hero);
    return ApiResponse.success({
      res,
      data: hero,
      message: "Hero updated successfully",
      statusCode: res.statusCode,
    });
  };

  toggleHeroStatus = async (req: Request, res: Response) => {
    const hero = await this.heroAdminService.toggleHeroStatus(req.params.slug);
    return ApiResponse.success({
      res,
      data: hero,
      message: "Hero status toggled successfully",
      statusCode: res.statusCode,
    });
  };

  getHeroBySlug = async (req: Request, res: Response) => {
    const hero = await this.heroAdminService.getHeroBySlug(req.params.slug);
    return ApiResponse.success({
      res,
      data: hero,
      message: "Hero fetched successfully",
      statusCode: res.statusCode,
    });
  };
}
