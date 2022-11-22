const express = require('express');
const { checkLogin, jwtVerify } = require('../common');
const authRoute = require('./auth.route');
const taskRoute = require('./task.route');
const categoryRoute = require('./category.route')


let route = express.Router();

route.use('/auth', authRoute);
route.use('/category', checkLogin, categoryRoute);
route.use('/task', checkLogin, taskRoute);

module.exports = route;