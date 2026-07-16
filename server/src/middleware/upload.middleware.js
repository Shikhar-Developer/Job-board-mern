import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination(req, File, cb) {
        cb(null, "uploads/resumes");
    }
}, {
    filename(req, file, cb) {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
}
)

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf")
        cb(null, true);
    else
        cb(new Error("Only PDF resumes are allowed."), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
export default upload;