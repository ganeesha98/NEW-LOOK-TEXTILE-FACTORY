const router = require("express").Router();
let AdminModels = require("../../models/AdminModels");

router.route("/add").post((req,res) => {

    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const AddressLine1 = req.body.AddressLine1;
    const AddressLine2 = req.body.AddressLine2;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const Role = req.body.Role;
    const userID = req.body.userID;

    const NewAdmin = new AdminModels({

        FirstName, LastName, AddressLine1, AddressLine2, Email, Password, Role, userID

    })

    NewAdmin.save().then(() => {
        res.json("Admin succesfully added..");
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get(async (req,res) => {
    AdminModels.find().then((AdminModels) => {
        res.json(AdminModels);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/get/:id").get(async (req, res) => {
    let userID = req.params.id;

    await AdminModels.findById(userID).then((emp) => {
        //res.status(200).send({status: "user fetched", emp});
        res.json(emp);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with fetched Admin", error: error.message});
    })
})

router.route("/update/:id").put(async (req, res) => {
    let userID = req.params.id;
    const {fname, lname, dob, nic, caddress, paddress, desig, dept, tp, email, salary, psw} = req.body;

    const updateStaff = {
        fname, lname, dob, nic, caddress, paddress, desig, dept, tp, email, salary, psw
}

    const update = await AdminModels.findByIdAndUpdate(userID, updateStaff).then(() => {

        res.status(200).send({status: "Admin updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: error.message});
    })

    
})

router.route("/delete/:id").delete(async (req, res) => {
    let userID = req.params.id;

    await AdminModels.findByIdAndDelete(userID).then(() => {

        res.status(200).send({status: "Admin deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete Admin", error: error.message});
    })
})

router.route("/signin/:userID").get(async (req, res) => {
    let userID = req.params.userID;
    await AdminModels.findOne(userID).then((emp) => {
        res.json(emp);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched Admin", error: error.message});
    })
})



module.exports = router;