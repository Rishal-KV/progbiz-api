"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const env_1 = require("./env");
dotenv_1.default.config();
exports.smsConfig = {
    brevo: {
        apiKey: env_1.ENV.email.brevo.apiKey || "",
        defaultSender: env_1.ENV.email.brevo.senderName,
    },
};
//# sourceMappingURL=sms.config.js.map