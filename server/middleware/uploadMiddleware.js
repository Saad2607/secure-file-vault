const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const name = path.parse(file.originalname).name;

        let resourceType = "image";

        if (ext === ".pdf" || ext === ".doc" || ext === ".docx") {
            resourceType = "raw"; // ✅ FIX
        }

        return {
            folder: "secure-file-vault",
            resource_type: resourceType,
            public_id: Date.now() + "-" + name,
        };
    },
});

const upload = multer({ storage });

module.exports = upload;