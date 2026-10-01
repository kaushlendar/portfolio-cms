const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project
        });
    } catch (error) {
        console.error("Create project error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .sort({ order: 1, createdAt: -1 });

        res.json({
            success: true,
            count: projects.length,
            projects
        });
    } catch (error) {
        console.error("Get projects error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            message: "Project updated successfully",
            project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};