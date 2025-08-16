"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../../../../utils/multer");
const hero_admin_controller_1 = require("../../controllers/admin/hero.admin.controller");
const hero_admin_service_1 = require("../../services/admin/hero.admin.service");
const heroAdminController = new hero_admin_controller_1.HeroAdminController(new hero_admin_service_1.HeroAdminService());
const heroAdminRouter = (0, express_1.Router)();
heroAdminRouter.get("/", heroAdminController.getAllHeros);
heroAdminRouter.post("/", multer_1.upload.single("image"), heroAdminController.createHero);
heroAdminRouter.get("/:slug", heroAdminController.getHeroBySlug);
heroAdminRouter.put("/:slug", multer_1.upload.single("image"), heroAdminController.updateHero);
heroAdminRouter.patch("/:slug", heroAdminController.toggleHeroStatus);
exports.default = heroAdminRouter;
//# sourceMappingURL=hero.admin.route.js.map