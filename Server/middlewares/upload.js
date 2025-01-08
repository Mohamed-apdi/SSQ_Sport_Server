import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage(); // Use memory storage

export const upload = multer({ storage });

export const imageUpload = async (fileBuffer, mimetype) => {
    const b64 = Buffer.from(fileBuffer).toString("base64");
    const dataURI = "data:" + mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto", // Automatically detect the resource type (image, video, etc.)
    });

    return {
        public_id: result.public_id,
        url: result.secure_url,
    };
};