const router = require("express").Router();
let OutletOrder = require("../../models/Outlet_Management/outlet_order.js");

router.route("/add/:ownerName/:ownerPhone/:outletID/:designCode/:productName/:OrderDate/:category/:size/:quantity").post((req, res) => {

    const ownerName = req.params.ownerName;
    const ownerPhone = req.params.ownerPhone;
    const outletID= req.params.outletID;
    const designCode = req.params.designCode;
    const productName = req.params.productName;
    const OrderDate = req.params.OrderDate;    
    const category= req.params.category;
    const size= req.params.size;
    const quantity= Number(req.params.quantity);

    const newOutletOrder = new OutletOrder({
        ownerName, ownerPhone, outletID, designCode, productName, OrderDate, category, size, quantity
    });

    newOutletOrder.save().then(() => {
            res.json("Outlet Order Successfully Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/").get((req, res) => {
    OutletOrder.find().then((outletOrder) => {
            res.json(outletOrder);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with getting data" });
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    let outletOrderID = req.params.id;

    await OutletOrder.findByIdAndDelete(outletOrderID).then(() => {
            res.status(200).send({ status: "Outlet Order deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete product", error: err.message });
        });
});

router.route("/find").get(async (req, res) => { 

    await OutletOrder.aggregate([
        {"$group" : { _id : {outletID: "$outletID", designCode: "$designCode"}, sum: {$sum: "$quantity"}}}
    ]).then((data) => {
        res.json(data);
    })
});

module.exports = router;