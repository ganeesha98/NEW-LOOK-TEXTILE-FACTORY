const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
require('./db/connect')

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const URL = process.env.MONGODB_URL;

const productRouter = require("./routes/Stock_and_Product_Management/product.js");
const categoryRouter = require("./routes/Stock_and_Product_Management/category.js");
const staffRouter1 = require("./routes/Employee_Management/Newstaff.js");
const staffRouter2 = require("./routes/Employee_Management/AttendanceR.js");
const orderRouter = require("./routes/Order_Management/Order.js");
const paymentRouter = require("./routes/Order_Management/Payment.js");
const driverRouter = require("./routes/Transport_management/Driver.js");
const deliverRouter = require("./routes/Transport_management/Deliver.js");
const outletRouter = require("./routes/Outlet_Management/Outlet.js");
const outletOrderRouter = require("./routes/Outlet_Management/Outlet_Order.js");
const machineRouter = require("./routes/Machinary_management/Machine.js");
const customerRouter = require("./routes/Customer_Mangement/Customer.js");
const userRouter = require("./routes/User_Management/User.js");
const authRouter = require("./routes/User_Management/Auth.js");
const managerUserRouter = require("./routes/User_Management/ManagerUser");
const managerAuthRouter = require("./routes/User_Management/ManagerAuth");


app.get("/", (req, res) => {
    res.send("Hello from node!");
});

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/newstaff", staffRouter1);
app.use("/attendance1", staffRouter2);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);
app.use("/driver", driverRouter);
app.use("/deliver", deliverRouter);
app.use("/outlet", outletRouter);
app.use("/outletOrder", outletOrderRouter);
app.use("/machine", machineRouter);
app.use("/customer", customerRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/mUser", managerUserRouter);
app.use("/mAuth", managerAuthRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port number: ${PORT}`);
});


