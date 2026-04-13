const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    avatar: String,

    password: {
        type: String,
        required: true,
    },

    storageLimit: {
        type: Number,
        default: 100 * 1024 * 1024,
    },
    
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);