"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialModel = exports.TESTIMONIAL_DB_REF = void 0;
const mongoose_1 = require("mongoose");
exports.TESTIMONIAL_DB_REF = "testimonials";
const testimonialSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    quote: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    slug: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});
exports.TestimonialModel = (0, mongoose_1.model)(exports.TESTIMONIAL_DB_REF, testimonialSchema);
//# sourceMappingURL=testimonial.model.js.map