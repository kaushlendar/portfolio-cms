const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        shortBio: {
            type: String,
            default: "",
            trim: true
        },

        fullBio: {
            type: String,
            default: "",
            trim: true
        },

        profileImage: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            default: "",
            trim: true
        },

        email: {
            type: String,
            default: "",
            trim: true
        },

        phone: {
            type: String,
            default: "",
            trim: true
        },

        resumeUrl: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("About", aboutSchema);