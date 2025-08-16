"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromS3 = exports.uploadToS3 = void 0;
const node_path_1 = __importDefault(require("node:path"));
const client_s3_1 = require("@aws-sdk/client-s3");
const env_1 = require("../config/env");
function extractS3KeyFromUrl(url) {
    // Regex updated to handle both regional and non-regional endpoints
    const regex = new RegExp(`https://${env_1.ENV.aws.bucketName}.s3(?:.[a-z0-9-]+)?\.amazonaws\.com/(.*)`);
    const match = url.match(regex);
    return match ? decodeURIComponent(match[1]) : null;
}
const s3Client = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: env_1.ENV.aws.accessKeyId,
        secretAccessKey: env_1.ENV.aws.secretAccessKey,
    },
    region: env_1.ENV.aws.region,
});
/**
 * Function to upload a file to S3
 * @param file - The buffer of file to upload
 * @param filename - The name of the file
 * @param mimetype - The mimetype of the file
 * @param folder - The folder to upload to
 * @returns - Object containing properties 'filename' and 'url'
 */
const uploadToS3 = async (file, filename, mimetype, folder) => {
    try {
        const fileExtension = node_path_1.default.extname(filename);
        const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExtension}`;
        const key = `${folder}/${uniqueFileName}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: env_1.ENV.aws.bucketName,
            Key: key,
            Body: file,
            ContentType: mimetype,
        });
        await s3Client.send(command);
        // Construct the public URL using the format that works
        const publicUrl = `https://${env_1.ENV.aws.bucketName}.s3.amazonaws.com/${key}`;
        return {
            filename: key,
            url: publicUrl,
        };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.uploadToS3 = uploadToS3;
/**
 * Function to delete a file from S3
 * @param url - The url of the file to delete
 * @returns - Nothing
 */
const deleteFromS3 = async (url) => {
    try {
        if (url === "")
            return;
        const fileKey = extractS3KeyFromUrl(url);
        if (!fileKey)
            throw new Error("Invalid S3 URL");
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: env_1.ENV.aws.bucketName,
            Key: fileKey,
        });
        await s3Client.send(command);
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteFromS3 = deleteFromS3;
//# sourceMappingURL=s3.js.map