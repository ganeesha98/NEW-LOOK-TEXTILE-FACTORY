const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const productSchema = new Schema({
    pID: {
        type: String,
        required: true,
    },
    pName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },    
    quantity: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
})

const Product = mongoose.model( 'Product',productSchema);

module.exports = Product;