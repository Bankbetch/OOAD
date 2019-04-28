const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
    types: Array,
    email: String
});

module.exports = mongoose.model('users', userSchema)