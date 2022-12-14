const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const outletSchema = new Schema({

    ownerName: {
        type: String,
        required: true,
    },
    NIC: {
        type: String,
        required: true,
    },
    outletName: {
        type: String,
        required: true,
    },
    ownerAddress: {
        type: String,
        required: true
    },
    ownerPhone: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    outletID: {
        type: String,
        required: true,
    },
    outletPhone: {
        type: String,
        required: true,
    },
})

const Outlet = mongoose.model( 'Outlet', outletSchema);

module.exports = Outlet;