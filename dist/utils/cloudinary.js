"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageFromCloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
// Configure Cloudinary (do this once in your config file)
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
/**
 * Deletes an image from Cloudinary by public ID
 * @param {string} publicId - Cloudinary public_id of the image to delete
 * @returns {Promise<object>} - Cloudinary delete response
 */
const deleteImageFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary_1.default.v2.uploader.destroy(publicId);
        return result;
    }
    catch (error) {
        console.error("Cloudinary delete error:", error);
        throw new Error("Failed to delete image from Cloudinary");
    }
};
exports.deleteImageFromCloudinary = deleteImageFromCloudinary;
//# sourceMappingURL=cloudinary.js.map