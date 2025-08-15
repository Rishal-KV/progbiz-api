import express from "express";
import aboutAdminRouter from "./about.admin.routes";
import adminAuthRouter from "./auth.admin.routes";
import faqAdminRouter from "./faq.admin.routes";
import heroAdminRouter from "./hero.admin.route";
import testimonialAdminRouter from "./testimonial.admin.routes";

const adminRoutes: express.Router = express.Router();

// ===>  v1/admin/
adminRoutes.use("/auth", adminAuthRouter);

adminRoutes.use("/about", aboutAdminRouter);
adminRoutes.use("/hero", heroAdminRouter);
adminRoutes.use("/faq", faqAdminRouter);
adminRoutes.use("/testimonial", testimonialAdminRouter);

export default adminRoutes;
