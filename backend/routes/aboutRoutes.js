const express = require("express");

const router = express.Router();

const {
    createAbout,
    getAbout,
    updateAbout
} = require("../controllers/aboutController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getAbout);

router.post("/", authMiddleware, createAbout);

router.put("/", authMiddleware, updateAbout);

module.exports = router;