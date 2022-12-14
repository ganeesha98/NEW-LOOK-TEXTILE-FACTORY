const router = require("express").Router();
let customer = require("../../models/Customer_Mangement/customer.js");

router.route("/add").post((req,res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const birthDate = req.body.birthDate;
    const phone = req.body.phone;
    const address = req.body.address;
    const email = req.body.email;
    const gender = req.body.gender;
    const password = req.body.password;

    const newCustomer = new customer({

        firstName, lastName, userName, birthDate, phone, address, email, gender, password

    })

    newCustomer.save().then(() => {
        res.json("customer added succesfully..");
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get((req, res) => {
    customer.find().then((customers) => {
        res.json(customers);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/get/:id").get(async (req, res) => {
    let CustomerID = req.params.id;

    await customer.findById(CustomerID).then((customer) => {
        res.json(customer);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched customer", error: error.message});
    })
})

router.route("/update/:id").put(async (req, res) => {
    let CustomerID = req.params.id;
    const {firstName, lastName, userName, birthDate, phone, address, email, gender, password} = req.body;

    const updateCustomer = {
        firstName, lastName, userName, birthDate, phone, address, email, gender, password
    }

    const update = await customer.findByIdAndUpdate(CustomerID, updateCustomer).then(() => {

        res.status(200).send({status: "customer updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with updating data", error: error.message});
    })

    
})


router.route("/delete/:id").delete(async (req, res) => {
    let customerID = req.params.id;

    await customer.findByIdAndDelete(customerID).then(() => {
            res.status(200).send({ status: "Customer deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Customer", error: err.message });
        });
});

module.exports = router;