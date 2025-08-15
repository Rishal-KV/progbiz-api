import { Router } from "express";
import { upload } from "../../../../utils/multer";
import { HeroAdminController } from "../../controllers/admin/hero.admin.controller";
import { HeroAdminService } from "../../services/admin/hero.admin.service";

const heroAdminController = new HeroAdminController(new HeroAdminService());
const heroAdminRouter = Router();

heroAdminRouter.get("/", heroAdminController.getAllHeros);
heroAdminRouter.post(
  "/",
  upload.single("image"),
  heroAdminController.createHero
);
heroAdminRouter.get("/:slug", heroAdminController.getHeroBySlug);
heroAdminRouter.put(
  "/:slug",
  upload.single("image"),
  heroAdminController.updateHero
);
heroAdminRouter.patch("/:slug", heroAdminController.toggleHeroStatus);

export default heroAdminRouter;
