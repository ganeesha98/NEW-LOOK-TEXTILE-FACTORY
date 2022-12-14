const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DeliverSchema = new Schema({

    cusName: {
        type: String,
        required: true
    },

    cusCountry: {
        type: String,
        required: true
    },

    cusCity: {
        type: String,
        required: true
    },

    cusEmail: {
        type: String,
        required: true
    },

    cusPhone: {
        type: String,
        required: true
    },

    cusPCode: {
        type: String,
        required: true
    },

    driverName: {
        type: String,
        required: true
    },

    vehicleNo: {
        type: String,
        required: true
    },

    driverID: {
        type: String,
        required: true
    },

    deliveryTime: {
        type: String,
        required: true
    },

    driverPhone: {
        type: String,
        required: true
    }    

})

const deliver = mongoose.model("deliver", DeliverSchema);

module.exports = deliver;