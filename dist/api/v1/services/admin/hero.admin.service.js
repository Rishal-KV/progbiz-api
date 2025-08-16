"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroAdminService = void 0;
const slugify_1 = __importDefault(require("slugify"));
const http_status_config_1 = require("../../../../config/http-status.config");
const error_middleware_1 = require("../../../../middleware/error.middleware");
const hero_model_1 = require("../../../../models/hero.model");
const cloudinary_1 = require("../../../../utils/cloudinary");
class HeroAdminService {
    constructor() {
        this.heroModel = hero_model_1.HeroModel;
    }
    async getAllHeros() {
        try {
            const heros = await this.heroModel.find().sort({ createdAt: -1 });
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: heros,
                message: "Heros fetched successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async createHero(hero, file) {
        try {
            const newHero = await this.heroModel.create({
                title: hero.title,
                subtitle: hero.subtitle,
                image: {
                    public_id: file?.filename,
                    secure_url: file?.path,
                },
                slug: (0, slugify_1.default)(hero.title),
            });
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: newHero,
                message: "Hero created successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async getHeroBySlug(slug) {
        try {
            const hero = await this.heroModel.findOne({ slug });
            if (!hero)
                throw new error_middleware_1.AppError("Hero not found", http_status_config_1.HTTP.NOT_FOUND);
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: hero,
                message: "Hero fetched successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async updateHero(slug, hero, file) {
        try {
            const updatedHero = await this.heroModel.findOneAndUpdate({ slug }, {
                ...hero,
                image: {
                    public_id: file?.filename,
                    secure_url: file?.path,
                },
            }, {
                new: true,
            });
            if (hero.oldImagePublicId) {
                await (0, cloudinary_1.deleteImageFromCloudinary)(hero.oldImagePublicId).catch((error) => {
                    console.log(error);
                });
            }
            if (!updatedHero)
                throw new error_middleware_1.AppError("Hero not found", http_status_config_1.HTTP.NOT_FOUND);
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: updatedHero,
                message: "Hero updated successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async toggleHeroStatus(slug) {
        try {
            const hero = await this.heroModel.findOne({ slug });
            if (!hero)
                throw new error_middleware_1.AppError("Hero not found", http_status_config_1.HTTP.NOT_FOUND);
            hero.status = hero.status === "active" ? "inactive" : "active";
            await hero.save();
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: hero,
                message: "Hero status toggled successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.HeroAdminService = HeroAdminService;
//# sourceMappingURL=hero.admin.service.js.map