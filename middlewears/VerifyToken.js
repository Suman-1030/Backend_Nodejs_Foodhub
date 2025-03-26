const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.SECRET_KEY; // Ensure this is correctly set in your .env file

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ error: "Token is required" });
        }

        const decoded = jwt.verify(token, secretKey);
        const vendor = await Vendor.findById(decoded.vendor_id);

        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        req.vendorId = vendor._id;
        next();
    } catch (error) {
        console.error("Token Verification Error:", error);
        return res.status(500).json({ error: "Invalid token" });
    }
};

module.exports = verifyToken;
