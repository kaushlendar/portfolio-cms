require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const skillRoutes = require("./routes/skillRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const blogRoutes = require("./routes/blogRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const connectDB = require("./config/db");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/contact", contactRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Portfolio CMS Backend is running"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "CMS API is healthy"
    });
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});