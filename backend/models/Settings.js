const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
    {
        siteTitle: {
            type: String,
            default: "Kaushlendar Kumar"
        },

        tagline: {
            type: String,
            default: "BCA Graduate • MCA Student"
        },

        heroTitle: {
            type: String,
            default: "Full Stack Developer"
        },

        location: {
            type: String,
            default: "Bihar, India"
        },

        email: {
            type: String,
            default: ""
        },

        phone: {
            type: String,
            default: ""
        },

        aboutText: {
            type: String,
            default: ""
        },

        profileImage: {
            type: String,
            default: ""
        },

        resumeUrl: {
            type: String,
            default: ""
        },

        githubUrl: {
            type: String,
            default: ""
        },

        linkedinUrl: {
            type: String,
            default: ""
        },

        instagramUrl: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Settings",
    settingsSchema
);