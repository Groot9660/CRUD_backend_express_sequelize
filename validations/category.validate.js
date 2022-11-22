const Joi = require('joi');

let createCategorySchema = Joi.object({
    Name: Joi.string().required(),

    Details: Joi.string().required()

})

let listCategorySchema = Joi.object({
    Name: Joi.string().required(),

    Details: Joi.string().required(),


})

let singleCategorySchema = Joi.object({
    Name: Joi.string().required(),

    Details: Joi.string().required(),


})

let updateCategorySchema = Joi.object({
    Name: Joi.string().required(),

    Details: Joi.string().required(),


})

let deleteCategorySchema = Joi.object({
    Name: Joi.string().required(),

    Details: Joi.string().required(),


})

module.exports = {
    createCategorySchema, listCategorySchema, singleCategorySchema, updateCategorySchema, deleteCategorySchema
}