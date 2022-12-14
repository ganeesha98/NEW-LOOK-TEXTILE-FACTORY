const mongoose = require('mongoose');
const schema = mongoose.Schema;

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const { boolean, string } = require('joi');


const customerData = new schema ({
    
    // email: {
    //     type: String,
    //     required: true
    // },
    // designation: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    // verify: {
    //     type: Boolean,
    // },
    // token: {
    //     type: String,
    // }


    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    birthDate: {
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

    email: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    verify: {
        type: Boolean,
    },
    designation: {
        type: String,
    }


}, {timestamps: true});

customerData.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "50s",
	});
	return token;    
};

const Customer = mongoose.model("customer1", customerData);

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        designation: Joi.string().required().label("Designation"),
        password: passwordComplexity().required().label("password"),
    });
    return schema.validate(data);
}
module.exports = {Customer, validate};