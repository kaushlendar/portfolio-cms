const Experience = require("../models/Experience");

const createExperience = async (req, res) => {
    try {
        const experience = await Experience.create(req.body);

        res.status(201).json({
            success: true,
            message: "Experience created successfully",
            experience
        });
    } catch (error) {
        console.error("Create experience error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find()
            .sort({ order: 1, createdAt: -1 });

        res.json({
            success: true,
            count: experiences.length,
            experiences
        });
    } catch (error) {
        console.error("Get experiences error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        res.json({
            success: true,
            experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        res.json({
            success: true,
            message: "Experience updated successfully",
            experience
        });
    } catch (error) {
        console.error("Update experience error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(
            req.params.id
        );

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        res.json({
            success: true,
            message: "Experience deleted successfully"
        });
    } catch (error) {
        console.error("Delete experience error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createExperience,
    getExperiences,
    getExperienceById,
    updateExperience,
    deleteExperience
};