const db = require("../models");
const { genSalt } = require("bcryptjs");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtVerify } = require("../common");
const { signUpSchema, loginSchema, forgetPassSchema, createPassSchema } = require("../validations/auth.validate");
var salt = bcrypt.genSaltSync(10);
let jwtSec = 'shhhhgiyguyfgyughjgkhilsrasdghhh';





async function signupHandler(req, res) {
    try {
        await signUpSchema.validateAsync(req.body)
        console.log("hitted.........");
        let { email, password, Cpassword, fname, lname, address, city, mobile_number } = req.body
        
        if (password !== Cpassword) return res.status(400).send({ message: "check password !!" })
        
        //encrypt the password
        var passwordHash = bcrypt.hashSync(password, salt);
        
        //check user is there or not
        let isAvailable = await db.customer.findOne({
            where: { email: email }
        })
        if (isAvailable) {
            res.status(400).send({ message: "user already exists." })
        }
        
        let newUser = await db.customer.create({
            email: email,
            password: passwordHash,
            fname: fname,
            lname: lname
        })
        console.log(newUser);
        let newCustomerInfo = await db.customerinfo.create({
            user_id: newUser.user_id,
            address: address,
            city: city,
            mobile_number: mobile_number
        })
        console.log();
        return res.status(200).send({ message: 'User signup successfully..', newCustomerInfo })
    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }
}

async function loginHandler(req, res) {
    try {
        await loginSchema.validateAsync(req.body)
        let { email, password } = req.body

        // check user exist for this email in database
        let isAvailable = await db.customer.findOne({
            where: {
                email: email
            },
            raw: true
        });
        console.log(isAvailable);
        if (!isAvailable) {
            return res.status(400).send({ message: "user not exist" })
        }

        //check password
        let passMatch = bcrypt.compareSync(password, isAvailable.password)
        // console.log(passMatch);
        if (!passMatch) return res.status(400).send({ message: "password is incorrect" })

        //generate jwt token 
        let token = jwt.sign({ ...isAvailable }, jwtSec, { expiresIn: 60 * 60 });
        await db.session.create({
            user_id: isAvailable.user_id,
            jwt: token,
            status: "valid",

        })


        return res.status(200).send({ name: "user login successful.", token })

    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }

}

async function forgetPasswordHandler(req, res) {
    try {
        await forgetPassSchema.validateAsync(req.body)
        let { email } = req.body
        let isAvailable = await db.Customer.findOne({
            where: {
                email: email
            }

        });
        if (!isAvailable) {
            return res.status(400).send({ message: "user not found" })
        };

        let resetToken = jwt.sign({ email: email }, jwtSec, { expiresIn: 120 })

        let URL = `http://localhost:3000/api/auth/createPassword/${resetToken}`

        return res.status(200).send({ message: "Token generated", URL: URL })

    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }
}

async function createPassword(req, res) {


    try {
        await createPassSchema.validateAsync({ ...req.params, ...req.body })
        let { token } = req.params
        let { password, Cpassword } = req.body

        let tokenIsValid = await jwtVerify(token)
        // console.log(tokenIsValid);
        if (tokenIsValid.email) {
            let isAvailable = await db.customer.findOne({
                where: {
                    email: tokenIsValid.email
                }
            });
            if (!isAvailable) return res.status(400).send({ message: "user not exist" });

            if (password !== Cpassword) return res.status(400).send({ message: "password is not match" });

            let passwordHash = bcrypt.hashSync(password, salt)

            await db.customer.update({
                password: passwordHash
            }, {
                where: {
                    email: isAvailable.email
                }
            })
            return res.status(200).send({ message: "password is updated successfully" })

        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ message: "token is expired" });
    }

}

async function getAllUser(req, res) {
    try {
        let data = await db.customerinfo.findAll({
            include: [
                { model: db.customer }
            ]
        })
        console.log(data);
        return res.status(200).send({ message: "data found", data: data })
    }
    catch (err) {
        return res.status(400).send({ message: err.message })
    }

}





module.exports.loginHandler = loginHandler;
module.exports.signupHandler = signupHandler;
module.exports.forgetPasswordHandler = forgetPasswordHandler;
module.exports.createPassword = createPassword;
module.exports.getAllUser = getAllUser;