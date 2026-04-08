const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const ext = path.extname(file.originalname).toLowerCase();

        let resourceType = "image";

        if (ext === ".pdf" || ext === ".doc" || ext === ".docx") {
            resourceType = "raw";
        }

        return {
            folder: "secure-file-vault",
            resource_type: resourceType,
            public_id: Date.now() + "-" + path.parse(file.originalname).name,
        };
    },
});

const upload = multer({ storage });

module.exports = upload;