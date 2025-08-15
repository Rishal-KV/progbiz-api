import { Router } from "express";
import { FaqModel } from "../../../../models/faq.model";
import FaqAdminController from "../../controllers/admin/faq.admin.controller";
import { FaqAdminService } from "../../services/admin/faq.admin.service";

const faqAdminController = new FaqAdminController(
  new FaqAdminService(FaqModel)
);
const faqAdminRouter = Router();

faqAdminRouter.get("/", faqAdminController.getAllFaqs);
faqAdminRouter.post("/", faqAdminController.createFaq);
faqAdminRouter.put("/:slug", faqAdminController.updateFaq);
faqAdminRouter.patch("/:slug", faqAdminController.toggleFaqStatus);
faqAdminRouter.get("/:slug", faqAdminController.getFaqBySlug);

export default faqAdminRouter;
