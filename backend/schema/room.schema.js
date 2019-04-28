const moogoose = require('mongoose')

var roomSchema = moogoose.Schema({
    build: String,
    room: String,
    sit: String,
    status: String,
    mon: Array,
    tue: Array,
    wed: Array,
    the: Array,
    fri: Array,
    sat: Array,
    sun: Array
})

module.exports = moogoose.model('rooms', roomSchema)