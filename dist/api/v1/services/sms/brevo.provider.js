"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrevoSmsProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../../../config/env");
class BrevoSmsProvider {
    // private defaultSender: string;
    constructor(config) {
        this.apiUrl = "https://api.brevo.com/v3/smtp/email";
        this.apiKey = config.apiKey;
        // this.defaultSender = config.defaultSender || "YourCompany";
    }
    async sendSms(message) {
        try {
            const response = await axios_1.default.post(this.apiUrl, {
                sender: { name: env_1.ENV.app.companyName, email: env_1.ENV.email.from },
                to: [{ email: message.to, name: message.name }],
                subject: message.subject,
                htmlContent: message.htmlContent,
            }, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "api-key": this.apiKey,
                },
            });
            return {
                success: true,
                messageId: response.data.messageId,
            };
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                return {
                    success: false,
                    error: error.response?.data?.message || error.message,
                };
            }
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error occurred",
            };
        }
    }
}
exports.BrevoSmsProvider = BrevoSmsProvider;
//# sourceMappingURL=brevo.provider.js.map