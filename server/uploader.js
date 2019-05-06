import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images/products');
  },
  filename: (req, file, callback) => {
    callback(null, 'IMG' + Date.now() + path.extname(file.originalname));
  }
});

const uploader = multer({ storage });

export default uploader;
