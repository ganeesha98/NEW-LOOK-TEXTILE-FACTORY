const router = require("express").Router();
let payment = require("../../models/Order_Management/payment.js");

router.route("/add").post((req,res) => {

    const fullName = req.body.fullName;
    const phone = req.body.phone;
    const email = req.body.email;
    const country = req.body.country;
    const city = req.body.city;
    const sAddress = req.body.sAddress;
    const pCode = req.body.pCode;
    const method = req.body.method;

    const newPayment = new payment({

        fullName, phone, email, country, city, sAddress, pCode, method

    })

    newPayment.save().then(() => {
        res.json("payment added succesfully..");
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get(async (req,res) => {
    payment.find().then((newPayment) => {
        res.json(newPayment);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/get/:id").get(async (req, res) => {
    let paymentID = req.params.id;

    await payment.findById(paymentID).then((payment) => {
        res.json(payment);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched user", error: error.message});
    })
});

router.route("/delete/:id").delete(async (req, res) => {
    let payID = req.params.id;

    await payment.findByIdAndDelete(payID).then(() => {
            res.status(200).send({ status: "payment deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete payment", error: err.message });
        });
});

module.exports = router;