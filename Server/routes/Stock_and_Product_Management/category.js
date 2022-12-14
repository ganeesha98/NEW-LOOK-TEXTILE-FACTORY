const router = require("express").Router();
const Category = require("../../models/Stock_and_Product_Management/category");

router.route("/add").post((req, res) => {
    console.log(req.body);
    console.log("Trggeered"); 
    const name = req.body.name;

    const newCategory = new Category({
        
        name,
        
    });

    newCategory
        .save()
        .then(() => {
            res.json("Category Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/").get((req, res) => {
    Category.find()
        .then((categories) => {
            res.json(categories);
        })
        .catch((err) => {
            console.log(err);
        });
});

//update
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name} = req.body;

    const updateCategory = {
        name,
    
    };

    await Category.findByIdAndUpdate(userId, updateCategory, { new: true })
        .then((update) => {
            res.status(200).send({ status: "Category updated"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data" });
        });
});

//delete
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Category.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "Category deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete category", error: err.message });
        });
});

//display
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    console.log(userId);
    Category.findById(userId)
        .then((categories) => {
            res.status(200).send({ status: "Category fetched", category: categories });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with fetch category", error: err.message });
        });
});

module.exports = router;
