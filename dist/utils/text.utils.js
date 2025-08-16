"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCaseToNormalCase = camelCaseToNormalCase;
exports.normalCaseToCamelCase = normalCaseToCamelCase;
exports.generateSlug = generateSlug;
function camelCaseToNormalCase(text) {
    if (!text)
        return "";
    return text
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
}
function normalCaseToCamelCase(text) {
    if (!text)
        return "";
    return text
        .split(" ")
        .map((word, index) => index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("");
}
function generateSlug(input) {
    // Convert to lowercase and replace all non-alphanumeric characters with hyphens
    const hyphenated = input.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    // Remove leading and trailing hyphens
    return hyphenated.replace(/^-+/, "").replace(/-+$/, "");
}
//# sourceMappingURL=text.utils.js.map