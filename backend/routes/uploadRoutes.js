const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
    uploadFile,
    deleteFile
} = require("../controllers/uploadController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
    "/",
    authMiddleware,
    upload.single("file"),
    uploadFile
);

router.delete(
    "/:filename",
    authMiddleware,
    deleteFile
);

module.exports = router;