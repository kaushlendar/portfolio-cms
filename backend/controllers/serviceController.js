const Service = require("../models/Service");

const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            message: "Service created successfully",
            service
        });
    } catch (error) {
        console.error("Create service error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getServices = async (req, res) => {
    try {
        const services = await Service.find()
            .sort({ order: 1, createdAt: -1 });

        res.json({
            success: true,
            count: services.length,
            services
        });
    } catch (error) {
        console.error("Get services error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        res.json({
            success: true,
            service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        res.json({
            success: true,
            message: "Service updated successfully",
            service
        });
    } catch (error) {
        console.error("Update service error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(
            req.params.id
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        res.json({
            success: true,
            message: "Service deleted successfully"
        });
    } catch (error) {
        console.error("Delete service error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
};