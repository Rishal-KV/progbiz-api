"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_util_1 = require("../../../../utils/response.util");
class AboutAdminController {
    constructor(aboutAdminService) {
        this.aboutAdminService = aboutAdminService;
        this.getAllAbouts = async (_, res) => {
            const abouts = await this.aboutAdminService.getAllAbouts();
            return response_util_1.ApiResponse.success({
                res,
                data: abouts,
                message: "Abouts fetched successfully",
                statusCode: abouts.status,
            });
        };
        this.createAbout = async (req, res) => {
            console.log(req.body);
            const about = await this.aboutAdminService.createAbout(req.body);
            return response_util_1.ApiResponse.success({
                res,
                data: about,
                message: "About created successfully",
                statusCode: about.status,
            });
        };
        this.updateAbout = async (req, res) => {
            const about = await this.aboutAdminService.updateAbout(req.params.slug, req.body);
            return response_util_1.ApiResponse.success({
                res,
                data: about,
                message: "About updated successfully",
                statusCode: about.status,
            });
        };
        this.toggleAboutStatus = async (req, res) => {
            const about = await this.aboutAdminService.toggleAboutStatus(req.params.slug);
            return response_util_1.ApiResponse.success({
                res,
                data: about,
                message: "About status toggled successfully",
                statusCode: about.status,
            });
        };
        this.getAboutBySlug = async (req, res) => {
            const about = await this.aboutAdminService.getAboutBySlug(req.params.slug);
            return response_util_1.ApiResponse.success({
                res,
                data: about,
                message: "About fetched successfully",
                statusCode: about.status,
            });
        };
    }
}
exports.default = AboutAdminController;
//# sourceMappingURL=about.admin.controller.js.map