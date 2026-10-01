const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        icon: {
            type: String,
            default: ""
        },

        technologies: {
            type: [String],
            default: []
        },

        featured: {
            type: Boolean,
            default: false
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

module.exports = mongoose.model("Service", serviceSchema);