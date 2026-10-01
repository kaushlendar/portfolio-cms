const fs = require("fs");
const path = require("path");

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const fileUrl = `/uploads/${req.file.filename}`;

        res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            file: {
                originalName: req.file.originalname,
                filename: req.file.filename,
                mimetype: req.file.mimetype,
                size: req.file.size,
                url: fileUrl
            }
        });
    } catch (error) {
        console.error("Upload error:", error.message);

        res.status(500).json({
            success: false,
            message: "File upload failed"
        });
    }
};

const deleteFile = async (req, res) => {
    try {
        const { filename } = req.params;

        if (!filename) {
            return res.status(400).json({
                success: false,
                message: "Filename is required"
            });
        }

        const filePath = path.join(
            __dirname,
            "..",
            "uploads",
            filename
        );

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }

        fs.unlinkSync(filePath);

        res.json({
            success: true,
            message: "File deleted successfully"
        });
    } catch (error) {
        console.error("Delete file error:", error.message);

        res.status(500).json({
            success: false,
            message: "File deletion failed"
        });
    }
};

module.exports = {
    uploadFile,
    deleteFile
};