const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "secure-file-vault",
        resource_type: "auto", // 🔥 supports image, pdf, doc
    },
});

const upload = multer({ storage });

module.exports = upload;