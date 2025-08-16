"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const api_1 = __importDefault(require("./api"));
const database_1 = require("./config/database");
const env_1 = require("./config/env");
const http_status_config_1 = require("./config/http-status.config");
const origins_config_1 = require("./config/origins.config");
const error_middleware_1 = require("./middleware/error.middleware");
const logger_util_1 = __importDefault(require("./utils/logger.util"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: origins_config_1.allowedOrigins,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use("/api", api_1.default);
app.all("*", (req, res) => {
    res
        .status(http_status_config_1.HTTP.NOT_FOUND)
        .json({ message: `Route ${req.originalUrl} not found` });
});
app.get("/health", (_req, res) => {
    res
        .status(http_status_config_1.HTTP.OK)
        .json({ status: "UP", message: "Server is up and kicking." });
});
app.use(error_middleware_1.errorHandler);
const startServer = async () => {
    try {
        await (0, database_1.connectToMongoDB)();
        app.listen(env_1.ENV.app.port, () => {
            logger_util_1.default.info(`🚀 Server running in ${env_1.ENV.app.nodeEnv} mode on port ${env_1.ENV.app.port}`);
        });
    }
    catch (error) {
        logger_util_1.default.error("Failed to start server:", error);
        process.exit(1);
    }
};
process.on("uncaughtException", (error) => {
    logger_util_1.default.error("Uncaught Exception:", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    logger_util_1.default.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});
startServer();
//# sourceMappingURL=app.js.map