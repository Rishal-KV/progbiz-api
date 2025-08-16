"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqModel = exports.FAQ_DB_REF = void 0;
const mongoose_1 = require("mongoose");
exports.FAQ_DB_REF = "faqs";
const faqSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    slug: { type: String, required: true },
}, {
    timestamps: true,
});
exports.FaqModel = (0, mongoose_1.model)(exports.FAQ_DB_REF, faqSchema);
//# sourceMappingURL=faq.model.js.map