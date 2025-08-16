"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplates = exports.EmailTemplateType = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const handlebars_1 = __importDefault(require("handlebars"));
var EmailTemplateType;
(function (EmailTemplateType) {
    EmailTemplateType["PASSWORD_RESET"] = "password-reset";
    EmailTemplateType["WELCOME"] = "welcome";
    EmailTemplateType["ACCOUNT_VERIFICATION"] = "account-verification";
    EmailTemplateType["CASE_CREATION"] = "case-creation";
})(EmailTemplateType || (exports.EmailTemplateType = EmailTemplateType = {}));
class EmailTemplateManager {
    constructor() {
        this.templateCache = new Map();
        this.subjectCache = new Map();
        this.templateDir = node_path_1.default.join(__dirname, "../../templates/emails");
        // Load the main layout template
        const mainTemplatePath = node_path_1.default.join(this.templateDir, "layout.html");
        const mainTemplateSource = node_fs_1.default.readFileSync(mainTemplatePath, "utf-8");
        this.mainTemplate = handlebars_1.default.compile(mainTemplateSource);
        // Register any needed Handlebars helpers
        this.registerHelpers();
    }
    registerHelpers() {
        handlebars_1.default.registerHelper("formatDate", (date) => {
            return date.toLocaleDateString();
        });
        // Helper to check if a string starts with a specific substring
        handlebars_1.default.registerHelper("startsWith", function (str, prefix, options) {
            if (typeof str === "string" && str.startsWith(prefix))
                return options.fn(this);
            return options.inverse(this);
        });
        // Helper to get the last four characters of a string (for card numbers)
        handlebars_1.default.registerHelper("lastFour", (str) => {
            if (typeof str === "string" && str.length >= 4)
                return str.slice(-4);
            return "****";
        });
    }
    loadTemplate(type) {
        const templatePath = node_path_1.default.join(this.templateDir, `${type}.html`);
        const configPath = node_path_1.default.join(this.templateDir, `${type}.json`);
        try {
            // Load the template content
            const templateSource = node_fs_1.default.readFileSync(templatePath, "utf-8");
            this.templateCache.set(type, handlebars_1.default.compile(templateSource));
            // Load the template configuration (subject, etc.)
            if (node_fs_1.default.existsSync(configPath)) {
                const configContent = node_fs_1.default.readFileSync(configPath, "utf-8");
                const config = JSON.parse(configContent);
                this.subjectCache.set(type, config.subject);
            }
            else {
                this.subjectCache.set(type, ""); // Default empty subject
            }
        }
        catch (error) {
            console.error(`Failed to load email template: ${type}`, error);
            throw new Error(`Email template not found: ${type}`);
        }
    }
    getTemplate(type, data) {
        // Load the template if not in cache
        if (!this.templateCache.has(type))
            this.loadTemplate(type);
        const contentTemplate = this.templateCache.get(type);
        const subject = this.subjectCache.get(type);
        // Compile the content template with the provided data
        const contentHtml = contentTemplate(data);
        // Render the main layout with the content
        const htmlContent = this.mainTemplate({
            ...data,
            content: contentHtml,
        });
        return {
            subject: this.compileSubject(subject, data),
            htmlContent,
        };
    }
    compileSubject(subject, data) {
        const subjectTemplate = handlebars_1.default.compile(subject);
        return subjectTemplate(data);
    }
}
// Export singleton instance
exports.emailTemplates = new EmailTemplateManager();
//# sourceMappingURL=email-template.util.js.map