"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.cloudinary = void 0;
// config/cloudinary.ts
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Fix: Use a params function that returns the correct structure
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (_req, file) => {
        return {
            folder: "my_uploads", // ✅ Type-safe now
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
            public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
        };
    },
});
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
//# sourceMappingURL=multer.js.map