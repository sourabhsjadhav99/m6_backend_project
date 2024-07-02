import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dg3hcewts",
  api_key: process.env.CLOUDINARY_API_KEY || "199154992164338",
  api_secret: process.env.CLOUDINARY_API_SECRET ||"secret_key" 
});

export default cloudinary;
