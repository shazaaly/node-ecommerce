const { file } = require('googleapis/build/src/apis/file');
const multer = require('multer');
const path = require('path');

// Set up storage engine
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFileFilter = function(req, file, cb){
    if(file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else{
        cb(new Error('Unsupported File Format!'),fa)
    }

}

// Multer upload configuration
const uploadPhoto = multer({
    storage: multerStorage, // The storage engine, to be defined elsewhere.
    fileFilter: imageFileFilter, // Use the image filtering function.
    limits: { fieldSize: 20_000_000 }, // Max file size in bytes (20MB).
  });

  const resizeImage = async(req, res, next) => {
    if (!req.file) return next();
    await Promise.all(req.files.map(async file => {
        await sharp(file.path)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(path.resolve(file.destination, 'resized', file.filename))
        
        
    }))


  }

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});
