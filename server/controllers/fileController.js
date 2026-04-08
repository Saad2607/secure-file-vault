const File = require("../models/File");
const fs = require("fs");
const CryptoJS = require("crypto-js");
const path = require("path");

exports.uploadFile = async (req, res) => {
    try {
        const file = req.file;

        // ✅ Read file
        const fileData = fs.readFileSync(file.path);

        // ✅ Encrypt
        const encryptedData = CryptoJS.AES.encrypt(
            fileData.toString("base64"),
            process.env.JWT_SECRET
        ).toString();

        // ✅ Save encrypted data
        fs.writeFileSync(file.path, encryptedData);

        file.path = `uploads/${file.filename}`;

        const newFile = new File({
            filename: file.filename,
            originalname: file.originalname,
            fileUrl: file.filename,
            path: file.path,
            user: req.user.id,
        });

        await newFile.save();

        res.status(201).json(newFile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.downloadFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Read encrypted data
        const encryptedData = fs.readFileSync(file.path, "utf-8");

        // Decrypt
        const bytes = CryptoJS.AES.decrypt(
            encryptedData,
            process.env.JWT_SECRET
        );

        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        // Convert back to buffer
        const fileBuffer = Buffer.from(decryptedData, "base64");

        // Send file
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${file.filename}"`
        );

        res.end(fileBuffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFiles = async (req, res) => {
    try {
        const files = await File.find({ user: req.user.id });
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: "Error fetching files" });
    }
};

exports.deletePermanent = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        if (file.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // delete from storage
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        // delete from DB
        await file.deleteOne();

        res.json({ message: "File permanently deleted" });

    } catch (error) {
        res.status(500).json({ message: "Permanent delete error" });
    }
};

exports.deleteFiles = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Security check
        if (file.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Move to trash instead of deleting
        file.isDeleted = true;
        await file.save();

        res.json({ message: "File moved to trash" });

    } catch (error) {
        res.status(500).json({ message: "Delete error" });
    }
};

exports.toggleFavorite = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        file.isFavorite = !file.isFavorite;
        await file.save();

        res.json(file);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.restoreFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        if (file.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        file.isDeleted = false;
        await file.save();

        res.json({ message: "File restored" });

    } catch (error) {
        res.status(500).json({ message: "Restore error" });
    }
};

exports.getFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        const filePath = path.join(process.cwd(), file.path);

        console.log("FILE PATH:", filePath); // 🔍 debug

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found on server" });
        }

        res.sendFile(filePath);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving file" });
    }
};