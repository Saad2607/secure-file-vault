const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const fileRoutes = require("./routes/fileRoutes");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/files", fileRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(5000, () => console.log("Server is running on PORT 5000"));