import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Multer configuration for PDF uploads
const pdfconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        const dir = './Public/cvs';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

// Middleware function to filter only PDF files
const ispdf = (req, file, callback) => {
    if (file.mimetype === "application/pdf") {
        callback(null, true); // Allow upload
    } else {
        callback(new Error("Only PDF files are allowed"));
    }
};

// Multer instance with configured storage and file filter
const upload = multer({
    storage: pdfconfig,
    fileFilter: ispdf
});


export default upload;