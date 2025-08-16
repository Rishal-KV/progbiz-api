"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = __importDefault(require("./admin/admin.routes"));
const public_routes_1 = __importDefault(require("./public/public.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const v1Routes = express_1.default.Router();
v1Routes.use("/admin", admin_routes_1.default);
v1Routes.use("/user", user_routes_1.default);
v1Routes.use("/public", public_routes_1.default);
exports.default = v1Routes;
//# sourceMappingURL=index.js.map