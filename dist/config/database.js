"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromMongoDB = exports.connectToMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_util_1 = __importDefault(require("../utils/logger.util"));
const env_1 = require("./env");
const connectToMongoDB = async () => {
    try {
        // Set mongoose options
        mongoose_1.default.set("strictQuery", true);
        // Connection options
        const options = {
            autoIndex: env_1.ENV.app.nodeEnv !== "production", // Don't build indexes in production
        };
        console.log(env_1.ENV.db.mongoUri);
        // Connect to MongoDB
        const connection = await mongoose_1.default.connect(env_1.ENV.db.mongoUri, options);
        logger_util_1.default.info("MongoDB connected");
        mongoose_1.default.connection.on("error", (err) => {
            logger_util_1.default.error("MongoDB connection error:", err);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            logger_util_1.default.warn("MongoDB disconnected");
        });
        // Handle process termination
        process.on("SIGINT", async () => {
            try {
                await mongoose_1.default.connection.close();
                logger_util_1.default.info("MongoDB connection closed due to app termination");
                process.exit(0);
            }
            catch (err) {
                logger_util_1.default.error("Error closing MongoDB connection:", err);
                process.exit(1);
            }
        });
        return connection;
    }
    catch (error) {
        logger_util_1.default.error("Failed to connect to MongoDB:", error);
        throw error;
    }
};
exports.connectToMongoDB = connectToMongoDB;
/**
 * Closes MongoDB connection
 */
const disconnectFromMongoDB = async () => {
    try {
        await mongoose_1.default.connection.close();
        logger_util_1.default.info("MongoDB connection closed");
    }
    catch (error) {
        logger_util_1.default.error("Error closing MongoDB connection:", error);
        throw error;
    }
};
exports.disconnectFromMongoDB = disconnectFromMongoDB;
//# sourceMappingURL=database.js.map