const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadFile, downloadFile, getFiles, deleteFiles, toggleFavorite, restoreFile, deletePermanent } = require("../controllers/fileController");

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("file"), uploadFile);

router.get("/download/:id", authMiddleware, downloadFile);

router.get("/", authMiddleware, getFiles);

router.delete("/:id", authMiddleware, deleteFiles);

router.put("/favorite/:id", authMiddleware, toggleFavorite);

router.put("/restore/:id", authMiddleware, restoreFile);

router.delete("/permanent/:id", authMiddleware, deletePermanent);

module.exports = router;