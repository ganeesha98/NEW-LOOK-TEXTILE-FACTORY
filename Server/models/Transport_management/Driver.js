const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransportSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    lisenNo: {
        type: String,
        required: true
    },

    vehicleReg: {
        type: String,
        required: true
    },

    vType: {
        type: String,
        required: true
    },

    vModel: {
        type: String,
        required: true
    },

    vColor: {
        type: String,
        required: true
    },

    vYear: {
        type: String,
        required: true
    },

    vInsCom: {
        type: String,
        required: true
    },

    vInsID: {
        type: String,
        required: true
    },

})

const transport = mongoose.model("transport", TransportSchema);

module.exports = transport;