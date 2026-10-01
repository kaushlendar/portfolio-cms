const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog
        });
    } catch (error) {
        console.error("Create blog error:", error.message);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Slug already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ order: 1, createdAt: -1 });

        res.json({
            success: true,
            count: blogs.length,
            blogs
        });
    } catch (error) {
        console.error("Get blogs error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getPublishedBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            published: true
        }).sort({
            publishedAt: -1,
            createdAt: -1
        });

        res.json({
            success: true,
            count: blogs.length,
            blogs
        });
    } catch (error) {
        console.error("Get published blogs error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({
            slug: req.params.slug
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            message: "Blog updated successfully",
            blog
        });
    } catch (error) {
        console.error("Update blog error:", error.message);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Slug already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(
            req.params.id
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        console.error("Delete blog error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createBlog,
    getBlogs,
    getPublishedBlogs,
    getBlogById,
    getBlogBySlug,
    updateBlog,
    deleteBlog
};