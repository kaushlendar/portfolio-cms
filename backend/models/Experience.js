const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            default: "",
            trim: true
        },

        employmentType: {
            type: String,
            default: "Full Time",
            trim: true
        },

        startDate: {
            type: String,
            required: true
        },

        endDate: {
            type: String,
            default: "Present"
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        technologies: {
            type: [String],
            default: []
        },

        order: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Experience", experienceSchema);