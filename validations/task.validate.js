const Joi = require('joi');

let createTaskSchema = Joi.object({
    Title: Joi.string().required(),
    details: Joi.string().required(),
    status: Joi.string().required(),
    Category_id: Joi.string().required()

})


module.exports = { createTaskSchema }