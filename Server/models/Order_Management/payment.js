const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({

    fullName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    sAddress: {
        type: String,
        required: true
    },

    pCode: {
        type: String,
        required: true
    },

    method: {
        type: String,
        required: true
    },

})

const payment = mongoose.model("payment", PaymentSchema);

module.exports = payment;