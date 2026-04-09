const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        const path = require("path");
        const name = path.parse(file.originalname).name;
        const ext = path.extname(file.originalname).replace(".", "");

        return {
            folder: "secure-file-vault",
            resource_type: "image", // 🔥 FORCE IMAGE
            public_id: Date.now() + "-" + name,
            format: ext, // keeps pdf extension
        };
    },
});

const upload = multer({ storage });

module.exports = upload;