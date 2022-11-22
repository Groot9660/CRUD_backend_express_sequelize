const Joi = require('joi');

let signUpSchema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    Cpassword: Joi.ref('password'),

    fname: Joi.string().min(2).max(20).required(),

    lname: Joi.string().min(2).max(20).required(),

    address: Joi.string().required(),

    city: Joi.string().required(),

    mobile_number: Joi.string().required()
})

let loginSchema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

let forgetPassSchema = Joi.object({
    email: Joi.string().email().required()
})

let createPassSchema = Joi.object({
    token: Joi.string().required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required,

    Cpassword: Joi.ref('password'),
})

module.exports = {
    signUpSchema, loginSchema, forgetPassSchema, createPassSchema
}