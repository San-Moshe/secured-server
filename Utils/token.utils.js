require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.createToken = (username) => {
    let token = jwt.sign({ username: username },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '5s' // expires in 1 minute
        }
    );
    // return the JWT token for the future API calls
    return token
}

module.exports.createRefreshToken = (username) => {
    let token = jwt.sign({ username: username },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '7d' // expires in 7 days
        }
    );
    // return the JWT token for the future API calls
    return token
}