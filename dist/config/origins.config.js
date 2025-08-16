"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorUrl = exports.adminUrl = exports.userUrl = exports.allowedOrigins = void 0;
const env_1 = require("./env");
const userUrl = env_1.ENV.app.userUrl;
exports.userUrl = userUrl;
const adminUrl = env_1.ENV.app.adminUrl;
exports.adminUrl = adminUrl;
const vendorUrl = env_1.ENV.app.vendorUrl;
exports.vendorUrl = vendorUrl;
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    userUrl,
    adminUrl,
    vendorUrl,
];
exports.allowedOrigins = allowedOrigins;
//# sourceMappingURL=origins.config.js.map