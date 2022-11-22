let jwtSec = 'shhhhgiyguyfgyughjgkhilsrasdghhh';
var jwt = require('jsonwebtoken');
function checkLogin(req, res, next) {
    //check headers 
    let authHeader = req.header('Authorization')

    // verify a token symmetric...
    jwt.verify(authHeader, jwtSec, function (err, decoded) {
        if (err) return res.status(401).send({ message: "session is expired, login again" });
        console.log("decoded data", decoded);
        req.userData = decoded
        next()
    });


}
function jwtVerify(jwtToken) {
    return new Promise((resolve, reject) => {

        jwt.verify(jwtToken, jwtSec, function (err, decoded) {
            if (err) reject(err)
            console.log("decoded data", decoded);
            resolve(decoded);


        });
    })
}

module.exports.jwtVerify = jwtVerify;
module.exports.checkLogin = checkLogin;
