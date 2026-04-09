const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    originalname: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    fileUrl: String,
    isFavorite: {
        type: Boolean,
        default: false
    },
    public_id: String,
    size: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("File", fileSchema);