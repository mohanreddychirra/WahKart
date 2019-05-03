import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    return callback(null, '/public/images');
  },
  filename: (req, file, callback) => {
    callback(null, 'image-' + Date.now());
  }
});

const uploader = multer({ storage });

export default uploader;
