import multer from 'multer';
import path from 'path';

// Cấu hình lưu file tạm thời
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Kiểm tra file có phải Excel không
const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname);
  if (fileExt === '.xls' || fileExt === '.xlsx') {
    cb(null, true);
  } else {
    cb(new Error('Import .xls or .xlsx file'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
