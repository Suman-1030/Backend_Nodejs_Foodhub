const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const VendorRouter = require("./routes/vendorRoutes");
const bodyparser = require("body-parser");
const firmroutes = require("./routes/Firmroutes");
const productroutes = require("./routes/Product");
const CartRouter=require("./routes/CartRoute")
const UserRoute=require("./routes/UserRoute")
const OrderRouter=require('./routes/OrderRoute')
const PaymentRoute=require('./routes/PaymentRouter')

const path = require("path");
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());             
app.use(bodyparser.urlencoded({ extended: true })); 


app.use(cors());


// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/vendor', VendorRouter);
app.use('/firm', firmroutes);
app.use('/Product', productroutes);
app.use('/cart',CartRouter)
app.use('/user',UserRoute)
app.use('/order',OrderRouter)
app.use('/payment', PaymentRoute)





// Connect MongoDB
mongoose.connect(process.env.MONGO_STR)
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.log("MongoDB connection failed", error);
});

// Home page route (only for '/')
app.get('/', (req, res) => {
  res.send("<h1>Welcome to FoodHub</h1>");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
