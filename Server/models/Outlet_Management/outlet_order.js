const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const outlet_orderSchema = new Schema({

    ownerName: {
        type: String,
        required: true,
    },

    ownerPhone: {
        type: String,
        required: true,
    },

    outletID: {
        type: String,
        required: true,
    },

    OrderDate: {
        type: String,
        required: true,
    },

    designCode: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    
    category: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const OutletOrder = mongoose.model( 'OutletOrder', outlet_orderSchema);

module.exports = OutletOrder;