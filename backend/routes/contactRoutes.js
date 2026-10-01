const express = require("express");

const router = express.Router();

const {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
} = require("../controllers/contactController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", createContact);

router.get("/", authMiddleware, getContacts);

router.get("/:id", authMiddleware, getContactById);

router.put("/:id", authMiddleware, updateContact);

router.delete("/:id", authMiddleware, deleteContact);

module.exports = router;