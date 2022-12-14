const router = require("express").Router();
let driver = require("../../models/Transport_management/Driver.js");

router.route("/add").post((req,res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;
    const lisenNo = req.body.lisenNo;
    const vehicleReg = req.body.vehicleReg;
    const vType = req.body.vType;
    const vModel = req.body.vModel;
    const vColor = req.body.vColor;
    const vYear = req.body.vYear;
    const vInsCom = req.body.vInsCom;
    const vInsID = req.body.vInsID;

    const newDriver = new driver({

        firstName, lastName, email, password, phone, address, lisenNo, vehicleReg, vType, vModel, vColor, vYear, vInsCom, vInsID

    })

    newDriver.save().then(() => {
        res.json("driver added succesfully..");
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get(async (req,res) => {
    driver.find().then((newDriver) => {
        res.json(newDriver);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/get/:id").get(async (req, res) => {
    let driverID = req.params.id;

    await driver.findById(driverID).then((driver) => {
        res.json(driver);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched user", error: error.message});
    })
})

router.route("/update/:id").put(async (req, res) => {
    let driverID = req.params.id;
    const {firstName, lastName, email, password, phone, address, lisenNo, vehicleReg, vType, vModel, vColor, vYear, vInsCom, vInsID} = req.body;

    const updateDriver = {
        firstName, lastName, email, password, phone, address, lisenNo, vehicleReg, vType, vModel, vColor, vYear, vInsCom, vInsID
    }

    const update = await driver.findByIdAndUpdate(driverID, updateDriver).then(() => {

        res.status(200).send({status: "driver updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with updating data", error: error.message});
    })

    
})

router.route("/delete/:id").delete(async (req, res) => {
    let driverID = req.params.id;

    await driver.findByIdAndDelete(driverID).then(() => {
            res.status(200).send({ status: "Driver deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Driver", error: err.message });
        });
});

module.exports = router;