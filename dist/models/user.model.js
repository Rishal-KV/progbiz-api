"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.USER_DB_REF = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });
userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
exports.USER_DB_REF = "admins";
exports.UserModel = mongoose_1.default.model(exports.USER_DB_REF, userSchema);
//# sourceMappingURL=user.model.js.map