const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        const path = require("path");
        const ext = path.extname(file.originalname).toLowerCase();
        const name = path.parse(file.originalname).name;

        let resourceType = "image";

        if (ext === ".pdf" || ext === ".doc" || ext === ".docx") {
            resourceType = "raw";
        }

        return {
            folder: "secure-file-vault",
            resource_type: resourceType,
            type: "upload", // ✅ VERY IMPORTANT FIX
            public_id: Date.now() + "-" + name,
            format: ext.replace(".", ""),
        };
    },
});

const upload = multer({ storage });

module.exports = upload;