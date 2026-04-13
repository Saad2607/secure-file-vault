const express = require("express");
const { registerUser, loginUser, updateAvatar, updateProfile, changePassword, getMe } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/avatar", authMiddleware, upload.single("avatar"), updateAvatar);

router.put("/update", authMiddleware, updateProfile)

router.put("/change-password", authMiddleware, changePassword);

router.get("/me", authMiddleware, getMe);

module.exports = router;