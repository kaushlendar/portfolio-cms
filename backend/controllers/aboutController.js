const About = require("../models/About");

const createAbout = async (req, res) => {
    try {
        const existingAbout = await About.findOne();

        if (existingAbout) {
            return res.status(400).json({
                success: false,
                message: "About section already exists"
            });
        }

        const about = await About.create(req.body);

        res.status(201).json({
            success: true,
            message: "About section created successfully",
            about
        });
    } catch (error) {
        console.error("Create about error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getAbout = async (req, res) => {
    try {
        const about = await About.findOne();

        if (!about) {
            return res.status(404).json({
                success: false,
                message: "About section not found"
            });
        }

        res.json({
            success: true,
            about
        });
    } catch (error) {
        console.error("Get about error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const updateAbout = async (req, res) => {
    try {
        const about = await About.findOneAndUpdate(
            {},
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!about) {
            return res.status(404).json({
                success: false,
                message: "About section not found"
            });
        }

        res.json({
            success: true,
            message: "About section updated successfully",
            about
        });
    } catch (error) {
        console.error("Update about error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createAbout,
    getAbout,
    updateAbout
};