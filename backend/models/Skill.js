const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            default: "Other",
            trim: true
        },

        level: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        icon: {
            type: String,
            default: ""
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

module.exports = mongoose.model("Skill", skillSchema);