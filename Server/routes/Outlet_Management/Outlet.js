const router = require("express").Router();
let Outlet = require("../../models/Outlet_Management/outlet.js");

router.route("/add").post((req, res) => {
    const ownerName = req.body.ownerName;
    const NIC = req.body.NIC;
    const outletName = req.body.outletName;
    const ownerAddress = req.body.ownerAddress;
    const ownerPhone = req.body.ownerPhone;
    const date = req.body.date;
    const email = req.body.email;
    const password = req.body.password;
    const outletID= req.body.outletID;
    const outletPhone= req.body.outletPhone;

    const newOutlet = new Outlet({
        ownerName, NIC, outletName, ownerAddress, ownerPhone, date, email, password, outletID, outletPhone
    });

    newOutlet.save().then(() => {
            res.json("Outlet Successfully Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/").get((req, res) => {
    Outlet.find().then((outlet) => {
            res.json(outlet);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with getting data" });
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    let outletID = req.params.id;

    await Outlet.findByIdAndDelete(outletID).then(() => {
            res.status(200).send({ status: "Outlet deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete product", error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    let outletid = req.params.id;
    const { ownerName, NIC, outletName, ownerAddress, ownerPhone, date, email, password, outletID, outletPhone } = req.body;

    const updateOutlet = {
        ownerName, NIC, outletName, ownerAddress, ownerPhone, date, email, password, outletID, outletPhone
    };

    await Outlet.findByIdAndUpdate(outletid, updateOutlet)
        .then(() => {
            res.status(200).send({ status: "Outlet updated"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data" });
        });
});

router.route("/get/:id").get(async (req, res) => {
    let outletID = req.params.id;

    await Outlet.findById(outletID).then((outlet) => {
        res.json(outlet);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched user", error: error.message});
    })
})

module.exports = router;