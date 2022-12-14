const router = require("express").Router();
let Product = require("../../models/Stock_and_Product_Management/product");

router.route("/add").post((req, res) => {
    const pID = req.body.pID;
    const pName = req.body.pName;
    const category = req.body.category;
    const price = Number(req.body.price);
    const size = req.body.size;
    const status = req.body.status;
    const quantity = Number(req.body.quantity);
    const color = req.body.color;
    const date= req.body.date;

    const newProduct = new Product({
        pID, pName, category, price, size, status, quantity, color, date
    });

    newProduct.save().then(() => {
            res.json("Product Successfully Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

//get
router.route("/").get((req, res) => {
    Product.find().then((products) => {
            res.json(products);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with getting data" });
        });
});

//update
router.route("/update/:id").put(async (req, res) => {
    let productID = req.params.id;
    const { pID, pName, category, price, size, status, quantity, color, date } = req.body;

    const updateProduct = {
        pID, pName, category, price, size, status, quantity, color, date
    };

    await Product.findByIdAndUpdate(productID, updateProduct)
        .then(() => {
            res.status(200).send({ status: "Product updated"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data" });
        });
});

//delete
router.route("/delete/:id").delete(async (req, res) => {
    let productID = req.params.id;

    await Product.findByIdAndDelete(productID).then(() => {
            res.status(200).send({ status: "Product deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete product", error: err.message });
        });
});

//display
router.route("/get/:id").get(async (req, res) => {
    let productID = req.params.id;
    Product.findById(productID).then((products) => {
        res.json(products);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with fetch product", error: err.message });
        });
});

router.route("/get/:id").get(async (req, res) => {
    let productID = req.params.id;
    Product.findById(productID).then((products) => {
        res.json(products);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with fetch product", error: err.message });
        });
});

//search category
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
    
    await Product.find(query).then((products) => {
        res.json(products);
        
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched data", error: error.message});
    })

});

module.exports = router;
