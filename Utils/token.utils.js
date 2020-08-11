const config = require("../config")
const jwt = require('jsonwebtoken');

module.exports.createToken = (username) => {
    let token = jwt.sign({ username: username },
        config.secret,
        {
            expiresIn: '24h' // expires in 24 hours
        }
    );
    // return the JWT token for the future API calls
    return {
        success: true,
        message: 'Authentication successful!',
        token: token
    };
}

