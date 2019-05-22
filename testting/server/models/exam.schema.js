const mongoose = require('mongoose')

var examSchema = mongoose.Schema({
    idExam: String,
    name: String,
    teacher: Array,
    faculty: String,
    timeStart: String,
    timeEnd: String,
    date: String,
    term: String,
    listNisit: Array,
    amongNisit: String,
    statusExam: String,
    examer: Array,
    room: String
})
module.exports = mongoose.model('exams', examSchema)