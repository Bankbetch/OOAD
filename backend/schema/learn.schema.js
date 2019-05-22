const moogoose = require('mongoose')

var learnSchema = moogoose.Schema({
    id: String,
    name: String,
    teacher: Array,
    faculty: String,
    build: String,
    unit: String,
    year: String,
    term: String,
    room: String,
    day: String,
    timeStart: String,
    timeEnd: String,
    sit: String,
    student: Array,
})
module.exports = moogoose.model('subjectlearns', learnSchema)