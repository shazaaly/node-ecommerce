const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


// Set up storage engine
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFileFilter = function(req, file, cb) {
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported File Format!'), false); // Corrected the 'fa' typo to 'false'.
    }
};

// Multer upload configuration
const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: imageFileFilter,
    limits: { fieldSize: 20_000_000 },
});


const resizeImage = async(req, res, next) => {
    if (!req.files) return next();
    try {
        await Promise.all(req.files.map(async file => {
            const dir = path.resolve(file.destination, 'resized');

            // Create the directory if it does not exist
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }

            await sharp(file.path)
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(path.resolve(dir, file.filename));
        }));
    } catch (error) {
        return next(error); // Proper error handling
    }
    next();
}

// Export the multer upload configuration and resizeImage function
module.exports = { uploadPhoto, resizeImage };
