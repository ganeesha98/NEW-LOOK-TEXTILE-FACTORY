const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const machineSchema = new Schema({

    machineID: {
        type: String,
        required: true,
    },
    machineName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    }
})

const Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;