const mongoose = require('mongoose');
const schema = mongoose.Schema;

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const { boolean, string } = require('joi');


const managerData = new schema ({
    
    email: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verify: {
        type: Boolean,
    },
    token: {
        type: String,
    }    

}, {timestamps: true});

managerData.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "50s",
	});
	return token;    
};

const Manager = mongoose.model("manager", managerData);

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        designation: Joi.string().required().label("Designation"),
        password: passwordComplexity().required().label("password"),
    });
    return schema.validate(data);
}
module.exports = {Manager, validate};