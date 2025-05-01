import cloudinary from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';

cloudinary.config({
  cloud_name: getEnvVar('CLOUDINARY_NAME'),
  api_key: getEnvVar('CLOUDINARY_API_KAY'),
  api_secret: getEnvVar('CLOUDINARY_SECRET'),
});

export const saveFileToCloud = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  return response.secure_url;
};
