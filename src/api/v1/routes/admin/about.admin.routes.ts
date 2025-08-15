import { Router } from "express";
import { AboutModel } from "../../../../models/about.model";
import AboutAdminController from "../../controllers/admin/about.admin.controller";
import { AboutAdminService } from "../../services/admin/about.admin.service";

const aboutAdminController = new AboutAdminController(
  new AboutAdminService(AboutModel)
);
const aboutAdminRouter = Router();

aboutAdminRouter.get("/", aboutAdminController.getAllAbouts);
aboutAdminRouter.post("/", aboutAdminController.createAbout);
aboutAdminRouter.put("/:slug", aboutAdminController.updateAbout);
aboutAdminRouter.patch("/:slug", aboutAdminController.toggleAboutStatus);
aboutAdminRouter.get("/:slug", aboutAdminController.getAboutBySlug);

export default aboutAdminRouter;
