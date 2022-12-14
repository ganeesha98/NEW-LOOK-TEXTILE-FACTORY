const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({

    FirstName: {
        type: String,
        required: true
    },

    LastName: {
        type: String,
        required: true
    },

    AddressLine1:{
        type: String,
        required: true
    },

    AddressLine2:{
        type: String,
        required: true
    },

    Email:{
        type: String,
        required: true
    },

    Password:{
        type: String,
        required: true
    },

    Role:{
        type: String,
        required: true
    },

    userID:{
        type: String,
        required: true
    }

})

const AdminModels = mongoose.model("NewAdmin", AdminSchema);

module.exports = AdminModels;