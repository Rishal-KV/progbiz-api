"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
/**
 * Recieves image buffer along with width and height, and returns a promise resolving to the cropped image buffer
 * @param file
 * @param width
 * @param height
 */
const resizeImage = async (file, width, height) => {
    try {
        return await (0, sharp_1.default)(file).resize(width, height).toBuffer();
    }
    catch (_error) {
        throw _error;
    }
};
exports.resizeImage = resizeImage;
//# sourceMappingURL=sharp.js.map