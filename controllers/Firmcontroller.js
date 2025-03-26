// Firmcontroller.js
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { Firmname, Area, Category, Region, Offer } = req.body;
        const image = req.file ? req.file.filename : undefined;
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        if (vendor.firm.length > 0) {
            return res.status(400).json({ message: "vendor can have only one firm" });
        }
        const firm = new Firm({
            Firmname,
            Area,
            Category,
            Region,
            Offer,
            image,
            vendor: vendor._id
        });
        const savedFirm = await firm.save();
        const firmId = savedFirm._id;
        const vendorFirmname = savedFirm.Firmname;
        vendor.firm.push(savedFirm);
        await vendor.save();
        return res.status(200).json({ message: 'Firm Added successfully ', firmId, vendorFirmname });
    } catch (error) {
        console.error(error);
        res.status(500).json("intenal server error");
    }
};

module.exports = { addFirm: [upload.single('image'), addFirm] };
