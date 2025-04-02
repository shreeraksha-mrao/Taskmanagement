import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: 'Blogs-v2',
        });

        fs.unlinkSync(localFilePath); // delete file from local after uploading to cloudinary
        return response;
    } catch (error) {
        // You can write logic to upload it again. I won't
        fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation failed
        return null;
    }
};

export default uploadOnCloudinary;