const Skill = require("../models/Skill");

const createSkill = async (req, res) => {
    try {
        const skill = await Skill.create(req.body);

        res.status(201).json({
            success: true,
            message: "Skill created successfully",
            skill
        });
    } catch (error) {
        console.error("Create skill error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find()
            .sort({ order: 1, createdAt: -1 });

        res.json({
            success: true,
            count: skills.length,
            skills
        });
    } catch (error) {
        console.error("Get skills error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        res.json({
            success: true,
            skill
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        res.json({
            success: true,
            message: "Skill updated successfully",
            skill
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        res.json({
            success: true,
            message: "Skill deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createSkill,
    getSkills,
    getSkillById,
    updateSkill,
    deleteSkill
};