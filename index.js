const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const VendorRouter = require("./routes/vendorRoutes");
const bodyparser = require("body-parser");
const firmroutes = require("./routes/Firmroutes");
const productroutes=require("./routes/Product")
const path = require("path");

const cors=require('cors')


dotenv.config();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
const PORT = process.env.PORT || 4000;


app.use(bodyparser.json());
app.use('/vendor', VendorRouter);
app.use('/firm', firmroutes);
app.use('/Product',productroutes)

mongoose.connect(process.env.MONGO_STR)
   
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.log("MongoDB connection failed", error);
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

app.use('/',(req,res)=>{
  res.send("<h1>welccome to FoodHub</h1>")
})