const express = require('express');
const { signupHandler, loginHandler, forgetPasswordHandler, createPassword } = require('../controller/authHandler');


let route = express.Router();

route.post('/signup', signupHandler);
route.post('/login', loginHandler);
route.post('/forgetPassword', forgetPasswordHandler);
route.post('/createPassword/:token', createPassword);


module.exports = route;