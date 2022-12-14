const router = require("express").Router();
let deliver = require("../../models/Transport_management/Deliver.js");

router.route("/add/:fullName/:country/:city/:email/:phone/:pCode/:driverName/:vehicleNo/:driverID/:deliveryTime/:driverPhone").post((req,res) => {

    const cusName = req.params.fullName;
    const cusCountry = req.params.country;
    const cusCity = req.params.city;
    const cusEmail = req.params.email;
    const cusPhone = req.params.phone;
    const cusPCode = req.params.pCode;
    const driverName = req.params.driverName;
    const vehicleNo = req.params.vehicleNo;
    const driverID = req.params.driverID;
    const deliveryTime = req.params.deliveryTime;
    const driverPhone = req.params.driverPhone;

    const newDeliver = new deliver({

        cusName, cusCountry, cusCity, cusEmail, cusPhone, cusPCode, driverName, vehicleNo, driverID, deliveryTime, driverPhone

    })

    newDeliver.save().then(() => {
        res.json("deliver added succesfully..");
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get(async (req,res) => {
    deliver.find().then((newDeliver) => {
        res.json(newDeliver);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/delete/:id").delete(async (req, res) => {
    let deliverID = req.params.id;

    await deliver.findByIdAndDelete(deliverID).then(() => {
            res.status(200).send({ status: "Deliver deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Deliver", error: err.message });
        });
});

module.exports = router;