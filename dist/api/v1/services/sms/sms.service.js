"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsService = exports.SmsService = void 0;
const sms_config_1 = require("../../../../config/sms.config");
const brevo_provider_1 = require("./brevo.provider");
class SmsService {
    constructor(provider) {
        this.provider = provider;
    }
    async sendSms(message) {
        return this.provider.sendSms(message);
    }
    async sendBulkSms(messages) {
        const responses = [];
        for (const message of messages) {
            const response = await this.provider.sendSms(message);
            responses.push(response);
        }
        return responses;
    }
}
exports.SmsService = SmsService;
const brevoProvider = new brevo_provider_1.BrevoSmsProvider({
    apiKey: sms_config_1.smsConfig.brevo.apiKey,
});
// Create the SMS service with the provider
exports.smsService = new SmsService(brevoProvider);
//# sourceMappingURL=sms.service.js.map