const express = require("express");

const router = express.Router();

const {
    registerAdmin,
    loginAdmin
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.get("/me", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Protected route accessed successfully",
        user: req.user
    });
});

module.exports = router;