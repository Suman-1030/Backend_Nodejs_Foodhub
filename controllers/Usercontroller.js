const User  = require('../models/User')

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    console.error("SECRET_KEY is not defined in environment variables.");
    process.exit(1);
}

const UserRegistration = async (req, res) => {
    const { Username, Email, Password } = req.body;

    try {
        const UserEmail = await User.findOne({ Email: Email.trim() });
        if (UserEmail) {
            return res.status(400).json("Email already taken");
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new User({
            Username,
            Email: Email.trim(),
            Password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: "Internal error" });
    }
};

const UserLogin = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const user = await User.findOne({ Email: Email.trim() })
        if (!user) {
            return res.status(404).json({msg:"user not found"});
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({msg : "Invalid password"});
        }

        const UserId=user._id
        

        const token = jwt.sign({ vendor_id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        console.log("Your token is:", token);
        res.status(200).json({ msg: "You are logged in successfully", token,UserId});

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Internal error" });
    }
};
    

module.exports = { UserRegistration, UserLogin };


