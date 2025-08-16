"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const about_admin_routes_1 = __importDefault(require("./about.admin.routes"));
const auth_admin_routes_1 = __importDefault(require("./auth.admin.routes"));
const faq_admin_routes_1 = __importDefault(require("./faq.admin.routes"));
const hero_admin_route_1 = __importDefault(require("./hero.admin.route"));
const testimonial_admin_routes_1 = __importDefault(require("./testimonial.admin.routes"));
const adminRoutes = express_1.default.Router();
// ===>  v1/admin/
adminRoutes.use("/auth", auth_admin_routes_1.default);
adminRoutes.use("/about", about_admin_routes_1.default);
adminRoutes.use("/hero", hero_admin_route_1.default);
adminRoutes.use("/faq", faq_admin_routes_1.default);
adminRoutes.use("/testimonial", testimonial_admin_routes_1.default);
exports.default = adminRoutes;
//# sourceMappingURL=admin.routes.js.map