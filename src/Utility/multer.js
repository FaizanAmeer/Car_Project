import multer from "multer";

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else
    ({ error: "Unsupported file format. Upload only JPEG/JPG or PNG" }), false;
};

const upload = multer({
  storage,
});

const multerMiddleware = upload.single("Images");

export default multerMiddleware;
