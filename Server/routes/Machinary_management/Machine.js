const router = require("express").Router();
let Machine = require("../../models/Machinary_management/machine.js");

router.route("/add").post((req, res) => {
    const machineID = req.body.machineID;
    const machineName = req.body.machineName;
    const date = req.body.date;
    const description = req.body.description;
    const content = req.body.content;
    const category = req.body.category;

    const newMachine = new Machine({
        machineID, machineName, date, description, content, category
    });

    newMachine.save().then(() => {
            res.json("Machine Successfully Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/").get((req, res) => {
    Machine.find().then((machine) => {
            res.json(machine);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with getting data" });
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    let machineID = req.params.id;

    await Machine.findByIdAndDelete(machineID).then(() => {
            res.status(200).send({ status: "Machine deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete machine", error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    let machineid = req.params.id;
    const { machineID, machineName, date, description, content, category } = req.body;

    const updateMachine = {
        machineID, machineName, date, description, content, category
    };

    await Machine.findByIdAndUpdate(machineid, updateMachine)
        .then(() => {
            res.status(200).send({ status: "Machine updated"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data" });
        });
});

router.route("/get/:id").get(async (req, res) => {
    let machineID = req.params.id;

    await Machine.findById(machineID).then((machine) => {
        res.json(machine);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched machine data", error: error.message});
    })
})

router.route("/find").get(async (req, res) => { 
    
    let categoryVal = req.query.category;

    var query = {};

    if(categoryVal === "All"){
        query = {}
    }
    else{
        query = {
            category: categoryVal
        }
    }     
    
    await Machine.find(query).then((machines) => {
        res.json(machines);
        
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched data", error: error.message});
    })

});

module.exports = router;