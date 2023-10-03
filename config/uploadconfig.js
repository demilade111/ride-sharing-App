const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // Filename
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // Accept file
  } else {
    cb(null, false); // Reject file
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB max
  },
  fileFilter,
});

module.exports = upload;
