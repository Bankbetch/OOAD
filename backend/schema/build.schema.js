const mongoose = require('mongoose')

var buildSchema = mongoose.Schema({
    name: String,
    amongRoom: String
})
module.exports = mongoose.model('builds', buildSchema)