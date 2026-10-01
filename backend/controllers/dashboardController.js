const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");
const Service = require("../models/Service");
const Blog = require("../models/Blog");
const Contact = require("../models/Contact");

const getDashboardStats = async (req, res) => {
    try {
        const [
            totalProjects,
            totalSkills,
            totalExperience,
            totalServices,
            totalBlogs,
            totalContacts,
            newContacts
        ] = await Promise.all([
            Project.countDocuments(),
            Skill.countDocuments(),
            Experience.countDocuments(),
            Service.countDocuments(),
            Blog.countDocuments(),
            Contact.countDocuments(),
            Contact.countDocuments({ status: "new" })
        ]);

        res.json({
            success: true,
            stats: {
                totalProjects,
                totalSkills,
                totalExperience,
                totalServices,
                totalBlogs,
                totalContacts,
                newContacts
            }
        });
    } catch (error) {
        console.error("Dashboard stats error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to get dashboard statistics"
        });
    }
};

module.exports = {
    getDashboardStats
};