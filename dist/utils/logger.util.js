"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
// Define custom severity levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
// Define colors for each level
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};
// Add colors to Winston
winston_1.default.addColors(colors);
const formatTimestamp = (timestamp) => {
    let date;
    if (typeof timestamp === "string") {
        // Fix the format: Remove the last colon and ensure milliseconds are valid
        const fixedTimestamp = timestamp.replace(/:(\d{3,4})$/, ".$1"); // Convert last `:` to `.`
        date = new Date(fixedTimestamp);
    }
    else {
        date = new Date(timestamp);
    }
    // If the date is invalid, return the original timestamp
    if (isNaN(date.getTime())) {
        return String(timestamp);
    }
    return date
        .toLocaleString("en-US", {
        month: "short", // "Mar"
        day: "2-digit", // "27"
        hour: "2-digit", // "11"
        minute: "2-digit", // "25"
        second: "2-digit", // "10"
        hour12: false, // Use 24-hour format
    })
        .replace(",", ""); // Remove the comma for formatting
};
const developmentFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf((info) => {
    // Ensure timestamp is a string before passing to Date constructor
    const dateStr = formatTimestamp(info.timestamp);
    return `${dateStr} ${info.level}: ${info.message}`;
}));
const productionFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.default.format.json());
// Create transports
const transports = [
    new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), process.env.NODE_ENV === "development"
            ? developmentFormat
            : productionFormat),
    }),
    new winston_1.default.transports.File({
        filename: "logs/error.log",
        level: "error",
    }),
    new winston_1.default.transports.File({
        filename: "logs/all.log",
    }),
];
// Create logger instance
const winstonLogger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || "info",
    levels,
    format: process.env.NODE_ENV === "development"
        ? developmentFormat
        : productionFormat,
    transports,
});
// Create our custom logger that only exposes the methods we want
const logger = {
    error: (message, ...meta) => winstonLogger.error(message, ...meta),
    warn: (message, ...meta) => winstonLogger.warn(message, ...meta),
    info: (message, ...meta) => winstonLogger.info(message, ...meta),
    http: (message, ...meta) => winstonLogger.http(message, ...meta),
    debug: (message, ...meta) => winstonLogger.debug(message, ...meta),
};
exports.default = logger;
//# sourceMappingURL=logger.util.js.map