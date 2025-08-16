"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutAdminService = void 0;
const slugify_1 = __importDefault(require("slugify"));
const http_status_config_1 = require("../../../../config/http-status.config");
const error_middleware_1 = require("../../../../middleware/error.middleware");
class AboutAdminService {
    constructor(aboutModel) {
        this.aboutModel = aboutModel;
    }
    async getAllAbouts() {
        try {
            const abouts = await this.aboutModel.find();
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: abouts,
                message: "Abouts fetched successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async createAbout(about) {
        try {
            const { heading, description } = about;
            if (!heading || !description) {
                throw new error_middleware_1.AppError("Invalid about data", http_status_config_1.HTTP.BAD_REQUEST);
            }
            const newAbout = await this.aboutModel.create({
                heading,
                description,
                slug: (0, slugify_1.default)(heading),
            });
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: newAbout,
                message: "About created successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAbout(slug, about) {
        try {
            const updatedAbout = await this.aboutModel.findOneAndUpdate({ slug }, about, {
                new: true,
            });
            if (!updatedAbout)
                throw new error_middleware_1.AppError("About not found", http_status_config_1.HTTP.NOT_FOUND);
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: updatedAbout,
                message: "About updated successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async toggleAboutStatus(slug) {
        try {
            const about = await this.aboutModel.findOne({ slug });
            if (!about)
                throw new error_middleware_1.AppError("About not found", http_status_config_1.HTTP.NOT_FOUND);
            about.status = about.status === "active" ? "inactive" : "active";
            await about.save();
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: about,
                message: "About status toggled successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
    async getAboutBySlug(slug) {
        try {
            const about = await this.aboutModel.findOne({ slug });
            if (!about)
                throw new error_middleware_1.AppError("About not found", http_status_config_1.HTTP.NOT_FOUND);
            return {
                status: http_status_config_1.HTTP.OK,
                success: true,
                data: about,
                message: "About fetched successfully",
            };
        }
        catch (error) {
            if (error instanceof error_middleware_1.AppError)
                throw error;
            throw new error_middleware_1.AppError(error.message, http_status_config_1.HTTP.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.AboutAdminService = AboutAdminService;
//# sourceMappingURL=about.admin.service.js.map