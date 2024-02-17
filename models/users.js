const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    token: String,
    firstname: String,
    username: String,
    password: String,
    userImg: String
});

const User = mongoose.model('users', userSchema);

module.exports = User;