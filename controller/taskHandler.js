//task handler

const db = require('../models');

const { createTaskSchema } = require('../validations/task.validate');

async function postHandler(req, res) {
    try {
        let userData = req.userData;
        await createTaskSchema.validateAsync(req.body)
        let { Title, details, status, Category_id } = req.body;

        //check task is there in DB
        let isAvailable = await db.task.findOne({
            where: {
                Title: Title,

            }
        });
        if (isAvailable) return res.status(400).send({ message: "task already exist" })
        let newtask = await db.task.create({
            userId: userData.user_id,
            Category_id: Category_id,
            Title: Title,
            details: details,
            status: status,
        });
        return res.status(200).send({ message: "Task created..", data: newtask })
    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }

}

async function getHandler(req, res) {
    try {
        let taskData = await db.task.findAll({
            include: [
                { model: db.Category },
                { model: db.Customer }
            ]
        })

        return res.status(200).send({ message: "data found ", data: taskData })
    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }

}


async function putHandler(req, res) {
    try {
        let { updateId } = req.params;
        let { Title, details, status, userData } = req.body
        let updatedData = await db.task.update({
            Title: Title,
            details: details,
            status: status

        }, {
            where: {
                task_id: updateId
            }
        })

        return res.status(200).send({ message: "Task Updated..." })
    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }

}


async function deleteHandler(req, res) {
    try {
        let { deleteId } = req.params;

        let deleteData = await db.task.destroy({
            where: {
                task_id: deleteId
            }
        })

        return res.status(200).send({ message: "Task is Deleted... " })
    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }

}



module.exports = { postHandler, getHandler, putHandler, deleteHandler }
