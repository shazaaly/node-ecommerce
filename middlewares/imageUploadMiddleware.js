// imageUploadMiddleware.js
const multer = require('multer');
const { cloudinary } = require('../utils/cloudinary');

// Multer setup for memory storage
const uploadPhoto = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20_000_000 }, // 20 MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload only images.'), false);
    }
  },
});

// Function to upload a file to Cloudinary
const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(buffer);
  });
};

// Middleware to resize and upload image
const resizeAndUploadImage = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();
  
  try {
    // Adjust the mapping here to pass the file buffer and options to uploadToCloudinary
    const uploadPromises = req.files.map(file => 
      uploadToCloudinary(file.buffer, {
        transformation: [{ width: 200, height: 200, crop: "limit" }]
      })
    );
    
    const results = await Promise.all(uploadPromises);
    req.imageUrls = results.map(result => result.url); // Store the URLs for the uploaded images
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadPhoto, resizeAndUploadImage };
