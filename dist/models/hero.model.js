"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroModel = exports.HERO_DB_REF = void 0;
const mongoose_1 = require("mongoose");
exports.HERO_DB_REF = "heros";
const heroSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: {
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true },
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    slug: { type: String, required: true },
}, {
    timestamps: true,
});
exports.HeroModel = (0, mongoose_1.model)(exports.HERO_DB_REF, heroSchema);
//# sourceMappingURL=hero.model.js.map