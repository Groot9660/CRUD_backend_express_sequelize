const db = require("../models");
const { createCategorySchema } = require("../validations/category.validate");

exports.createHandler = async (req, res) => {
    try {
        await createCategorySchema.validateAsync(req.body);
        let { Name, Details } = req.body
        let newData = await db.category.create({
            Name: Name,
            Details: Details
        });
        return res.status(200).send({ message: "Category created..", data: newData })

    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }
}

exports.listHandler = (req, res) => {
    try {

    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }
}

exports.singleHandler = async (req, res) => {
    try {
        let data = await db.category.findOne({
            where: req.params.id
        })
    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }
}

exports.updateHandler = (req, res) => {
    try {

    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }
}

exports.deleteHandler = (req, res) => {
    try {

    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }
}