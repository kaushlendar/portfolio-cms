require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const User = require("./models/User");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const email = "kaushlendar9508594279@gmail.com";

rl.question("Enter NEW admin password: ", async (password) => {
    try {
        if (!password || password.length < 6) {
            console.log("Password must be at least 6 characters.");
            rl.close();
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI);

        const user = await User.findOne({ email });

        if (!user) {
            console.log("Admin user not found.");
            await mongoose.disconnect();
            rl.close();
            return;
        }

        user.password = await bcrypt.hash(password, 10);

        await user.save();

        console.log("Admin password reset successfully.");

        await mongoose.disconnect();
    } catch (error) {
        console.error("Password reset failed:", error.message);
    } finally {
        rl.close();
    }
});