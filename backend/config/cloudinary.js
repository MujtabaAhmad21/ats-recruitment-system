const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// 1. Authenticate with Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configure the storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ats_resumes', // It will create this folder in your Cloudinary account
    allowed_formats: ['pdf', 'doc', 'docx'], // Restrict to documents
    resource_type: 'raw' // 'raw' is required for non-image files like PDFs in Cloudinary
  }
});

// 3. Initialize Multer with our engine
const upload = multer({ storage: storage });

module.exports = upload;
