import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (filePath,folder = "documents") => {
    const result = await cloudinary.uploader.upload(filePath, {folder,resource_type: "raw",});
     return {
        url: result.secure_url,
        publicId: result.public_id,
    };
};

export const deleteFromCloudinary = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw",
    });
};