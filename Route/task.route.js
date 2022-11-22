const express = require('express');
const { signupHandler, loginHandler } = require('../controller/authHandler');
const { postHandler, getHandler, putHandler, deleteHandler } = require('../controller/taskHandler');


let route = express.Router();

route.post('/', postHandler);
route.get('/list', getHandler);
route.put('/:updateId', putHandler);
route.delete('/:deleteId', deleteHandler);

module.exports = route;