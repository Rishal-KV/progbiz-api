"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroAdminController = void 0;
const response_util_1 = require("../../../../utils/response.util");
class HeroAdminController {
    constructor(heroAdminService) {
        this.heroAdminService = heroAdminService;
        this.getAllHeros = async (_, res) => {
            const heros = await this.heroAdminService.getAllHeros();
            return response_util_1.ApiResponse.success({
                res,
                data: heros,
                message: "Heros fetched successfully",
                statusCode: res.statusCode,
            });
        };
        this.createHero = async (req, res) => {
            const { file } = req;
            console.log(file);
            const hero = await this.heroAdminService.createHero(req.body, file);
            return response_util_1.ApiResponse.success({
                res,
                data: hero,
                message: "Hero created successfully",
                statusCode: res.statusCode,
            });
        };
        this.updateHero = async (req, res) => {
            const hero = await this.heroAdminService.updateHero(req.params.slug, req.body, req.file);
            console.log(hero);
            return response_util_1.ApiResponse.success({
                res,
                data: hero,
                message: "Hero updated successfully",
                statusCode: res.statusCode,
            });
        };
        this.toggleHeroStatus = async (req, res) => {
            const hero = await this.heroAdminService.toggleHeroStatus(req.params.slug);
            return response_util_1.ApiResponse.success({
                res,
                data: hero,
                message: "Hero status toggled successfully",
                statusCode: res.statusCode,
            });
        };
        this.getHeroBySlug = async (req, res) => {
            const hero = await this.heroAdminService.getHeroBySlug(req.params.slug);
            return response_util_1.ApiResponse.success({
                res,
                data: hero,
                message: "Hero fetched successfully",
                statusCode: res.statusCode,
            });
        };
    }
}
exports.HeroAdminController = HeroAdminController;
//# sourceMappingURL=hero.admin.controller.js.map