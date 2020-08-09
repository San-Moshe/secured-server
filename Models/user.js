const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String }
})

const user = mongoose.model("users", userSchema);

module.exports = user;