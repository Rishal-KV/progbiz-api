import cloudinary from "cloudinary";

// Configure Cloudinary (do this once in your config file)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Deletes an image from Cloudinary by public ID
 * @param {string} publicId - Cloudinary public_id of the image to delete
 * @returns {Promise<object>} - Cloudinary delete response
 */
export const deleteImageFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};
