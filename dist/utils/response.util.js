"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginated = exports.ApiResponse = void 0;
const http_status_config_1 = require("../config/http-status.config");
class ApiResponse {
    // Success responses
    static success({ res, data = null, message = "Success", statusCode = http_status_config_1.HTTP.OK, }) {
        const responseData = {
            success: true,
            message,
            data,
        };
        return res.status(statusCode).json(responseData);
    }
    static created({ res, data = null, message = "Resource created successfully", }) {
        return ApiResponse.success({
            res,
            data,
            message,
            statusCode: http_status_config_1.HTTP.CREATED,
        });
    }
    // Error responses
    static error({ res, message = "Internal server error", statusCode = http_status_config_1.HTTP.INTERNAL_SERVER_ERROR, error = null, }) {
        const responseData = {
            success: false,
            message,
            error,
            statusCode,
        };
        return res.status(statusCode).json(responseData);
    }
    static badRequest({ res, message = "Bad request", error = null, }) {
        return ApiResponse.error({
            res,
            message,
            statusCode: http_status_config_1.HTTP.BAD_REQUEST,
            error,
        });
    }
    static unauthorized({ res, message = "Unauthorized", error = null, }) {
        return ApiResponse.error({
            res,
            message,
            statusCode: http_status_config_1.HTTP.UNAUTHORIZED,
            error,
        });
    }
    static forbidden({ res, message = "Forbidden", error = null, }) {
        return ApiResponse.error({
            res,
            message,
            statusCode: http_status_config_1.HTTP.FORBIDDEN,
            error,
        });
    }
    static notFound({ res, message = "Resource not found", error = null, }) {
        return ApiResponse.error({
            res,
            message,
            statusCode: http_status_config_1.HTTP.NOT_FOUND,
            error,
        });
    }
    // Paginated response
    static paginated({ res, data = [], page = 1, limit = 10, total = 0, message = "Success", }) {
        const responseData = {
            success: true,
            message,
            data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit) || 1,
            },
        };
        return res.status(http_status_config_1.HTTP.OK).json(responseData);
    }
}
exports.ApiResponse = ApiResponse;
const paginated = ({ res, data = [], page = 1, limit = 10, total = 0, message = "Success", }) => {
    const responseData = {
        success: true,
        message,
        data,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit) || 1,
        },
    };
    return res.status(http_status_config_1.HTTP.OK).json(responseData);
};
exports.paginated = paginated;
//# sourceMappingURL=response.util.js.map