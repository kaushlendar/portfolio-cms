const express = require("express");

const router = express.Router();

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.post("/", authMiddleware, createProject);

router.put("/:id", authMiddleware, updateProject);

router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;