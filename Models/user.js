const mongoose = require("mongoose")

//TODO add password hashing and validation to the schema according to 
//https://medium.com/better-programming/a-practical-guide-for-jwt-authentication-using-nodejs-and-express-d48369e7e6d4
const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String }
})

const user = mongoose.model("users", userSchema);

module.exports = user;