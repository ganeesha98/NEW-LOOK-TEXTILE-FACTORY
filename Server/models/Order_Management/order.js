const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({  

    pdName: {
        type: String,
        required: true,
    },

    oColor:{
        type: String,     
        required: true
    },

    oSize:{
        type: String,
        required: true
    },

    oQuantity:{
        type: String,
        required: true        
    },

    total:{
        type: String,
        required: true
    }

})

const order = mongoose.model("order", OrderSchema);

module.exports = order;