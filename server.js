const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models/index')

const bcrypt = require('bcryptjs');
// const { getMysqlConnection, releaseMysqlConnection, runQuery } = require('./database');

const Customer = require('./models/Customer');
const Task = require('./models/Task');

const indexRoute = require('./route/index.route')
const session = require('./models/session')



// database conncection
// sequelize.authenticate().then(() => {
//     console.log('Connection established successfully.');
//     sequelize.sync()
// }).catch(err => {
//     console.log('Database is not connected');
// });

var salt = bcrypt.genSaltSync(10);
let app = express();

let user = []


// middleware
app.use(cors())

app.use((req, res, next) => {
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRoute)
// http://localhost:3000/api/auth/login
app.get('/', (req, res) => {
    res.send('<h1>Express is running...</h1>')
})


app.listen(process.env.PORT, () => {
    console.log(`Server is live`);
})
// app.post('/login', async(req, res) => {
//     let { email, password } = req.body;
//     // user exist with this email address;
//     let connection = await getConnectionMysql();
//     let isUserAvailable = await runQuery(connection, `SELECT * FROM user where email='${email}'`);
//     releaseConnectionMysql(connection);

//     if (isUserAvailable.length <= 0) {
//         return res.status(400).send({ message: "User  not exist with this email address.", success: false });
//     }

//     // compare the password
//     let userData = isUserAvailable[0];
//     let isMatch = bcrypt.compareSync(password, userData.password);

//     if (!isMatch) {
//         return res.status(400).send({ message: "Password is incorrect", success: false });
//     }

//     return res.status(200).send({ message: "User successfully login", success: true, userData: { userId: userData.userId } });

// })

// app.post('/signup', async(req, res) => {
//     let { email, password, Cpassword, fname, lname } = req.body;
//     if (password !== Cpassword) {
//         return res.status(400).send({ message: "Password are not matched..", success: false })
//     }
//     let encPassword = bcrypt.hashSync(password, salt);
//     console.log("encPassword====>", encPassword);
//     let connection = await getConnectionMysql();
//     let isUserAvailable = await runQuery(connection, `SELECT * FROM user where email='${email}'`);

//     if (isUserAvailable.length > 0) {
//         return res.status(400).send({ message: "User already exist with this email address", success: false })
//     }

//     let newData = await runQuery(connection, `INSERT INTO user (email,password,fname,lname) VALUES ('${email}','${encPassword}','${fname}','${lname}')`);
//     releaseConnectionMysql(connection);
//     return res.status(200).send({ message: 'User signup successfully.', success: true })

// });

// app.post('/user-details', async(req, res) => {
//     let { userId } = req.body;
//     let connection = await getConnectionMysql();
//     let isUserAvailable = await runQuery(connection, `SELECT * FROM user where userId=${userId}`);
//     if (isUserAvailable.length <= 0) {
//         return res.status(400).send({ message: "User not exist with this email address.", success: false });
//     }
//     let userData = isUserAvailable[0]
//     return res.status(200).send({ message: "User data found", success: true, data: { fname: userData.fname, lname: userData.lname, email: userData.email } });
// })

