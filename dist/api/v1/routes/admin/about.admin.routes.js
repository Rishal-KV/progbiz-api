"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const about_model_1 = require("../../../../models/about.model");
const about_admin_controller_1 = __importDefault(require("../../controllers/admin/about.admin.controller"));
const about_admin_service_1 = require("../../services/admin/about.admin.service");
const aboutAdminController = new about_admin_controller_1.default(new about_admin_service_1.AboutAdminService(about_model_1.AboutModel));
const aboutAdminRouter = (0, express_1.Router)();
aboutAdminRouter.get("/", aboutAdminController.getAllAbouts);
aboutAdminRouter.post("/", aboutAdminController.createAbout);
aboutAdminRouter.put("/:slug", aboutAdminController.updateAbout);
aboutAdminRouter.patch("/:slug", aboutAdminController.toggleAboutStatus);
aboutAdminRouter.get("/:slug", aboutAdminController.getAboutBySlug);
exports.default = aboutAdminRouter;
//# sourceMappingURL=about.admin.routes.js.map