const Settings = require("../models/Settings");

const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();

        if (!settings) {
            settings = await Settings.create({});
        }

        res.json({
            success: true,
            settings
        });

    } catch (error) {
        console.error(
            "Get settings error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to get settings"
        });
    }
};


const updateSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();

        if (!settings) {
            settings = new Settings();
        }

        Object.assign(
            settings,
            req.body
        );

        await settings.save();

        res.json({
            success: true,
            message: "Settings updated successfully",
            settings
        });

    } catch (error) {
        console.error(
            "Update settings error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to update settings"
        });
    }
};


module.exports = {
    getSettings,
    updateSettings
};