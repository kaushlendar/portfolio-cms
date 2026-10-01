const Contact = require("../models/Contact");

const createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required"
            });
        }

        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            contact
        });
    } catch (error) {
        console.error("Create contact error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to send message"
        });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: contacts.length,
            contacts
        });
    } catch (error) {
        console.error("Get contacts error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to get messages"
        });
    }
};

const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.json({
            success: true,
            contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get message"
        });
    }
};

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.json({
            success: true,
            message: "Message updated successfully",
            contact
        });
    } catch (error) {
        console.error("Update contact error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to update message"
        });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(
            req.params.id
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.json({
            success: true,
            message: "Message deleted successfully"
        });
    } catch (error) {
        console.error("Delete contact error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to delete message"
        });
    }
};

module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
};