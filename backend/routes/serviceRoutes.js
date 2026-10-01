const express = require("express");

const router = express.Router();

const {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getServices);

router.get("/:id", getServiceById);

router.post("/", authMiddleware, createService);

router.put("/:id", authMiddleware, updateService);

router.delete("/:id", authMiddleware, deleteService);

module.exports = router;