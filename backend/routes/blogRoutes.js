const express = require("express");

const router = express.Router();

const {
    createBlog,
    getBlogs,
    getPublishedBlogs,
    getBlogById,
    getBlogBySlug,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getBlogs);

router.get("/published", getPublishedBlogs);

router.get("/slug/:slug", getBlogBySlug);

router.get("/:id", getBlogById);

router.post("/", authMiddleware, createBlog);

router.put("/:id", authMiddleware, updateBlog);

router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;