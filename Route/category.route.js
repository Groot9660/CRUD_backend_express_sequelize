const express = require('express');
const { createHandler, listHandler, singleHandler, updateHandler, deleteHandler } = require('../controller/categoryHandler');


let route = express.Router();

route.post('/', createHandler);
route.get('/list', listHandler);
route.get('/', singleHandler)
route.put('/:updateId', updateHandler);
route.delete('/:deleteId', deleteHandler);


module.exports = route;