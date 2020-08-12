require('dotenv').config();
let jwt = require('jsonwebtoken');


let checkToken = (req, res, next) => {
    console.log(req.body);

    if (req.path == "/register" || req.path == "/login" || req.path == "/.well-known/pki-validation" || req.path == "/refresh") {
        return next();
    }

    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken: checkToken
}