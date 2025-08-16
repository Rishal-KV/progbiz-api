"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutModel = exports.ABOUT_DB_REF = void 0;
const mongoose_1 = require("mongoose");
exports.ABOUT_DB_REF = "abouts";
const aboutSchema = new mongoose_1.Schema({
    heading: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    slug: { type: String, required: true },
}, { timestamps: true });
exports.AboutModel = (0, mongoose_1.model)(exports.ABOUT_DB_REF, aboutSchema);
//# sourceMappingURL=about.model.js.map