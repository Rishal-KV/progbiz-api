import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import apiRoutes from "./api";
import { connectToMongoDB } from "./config/database";
import { ENV } from "./config/env";
import { HTTP } from "./config/http-status.config";
import { allowedOrigins } from "./config/origins.config";
import { errorHandler } from "./middleware/error.middleware";
import logger from "./utils/logger.util";

const app: Express = express();

// CORS configuration
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  preflightContinue: false,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

// Security and compression middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging middleware
app.use(morgan("dev"));

// Debug middleware (remove in production)
app.use((req, res, next) => {
  console.log(`${req.method} request from origin: ${req.headers.origin}`);
  console.log("Allowed origins:", allowedOrigins);
  next();
});

// Health check route (before API routes)
app.get("/health", (_req, res) => {
  res
    .status(HTTP.OK)
    .json({ status: "UP", message: "Server is up and kicking." });
});

// API routes
app.use("/api", apiRoutes);

// Catch-all route for unmatched routes
app.all("*", (req, res) => {
  res
    .status(HTTP.NOT_FOUND)
    .json({ message: `Route ${req.originalUrl} not found` });
});

// Error handling middleware (must be last)
app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    await connectToMongoDB();

    const port = ENV.app.port || 5000;

    app.listen(port, () => {
      logger.info(
        `🚀 Server running in ${ENV.app.nodeEnv} mode on port ${port}`
      );
      logger.info(`📋 Allowed origins: ${JSON.stringify(allowedOrigins)}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Global error handlers
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Start the server
startServer();

export default app;
