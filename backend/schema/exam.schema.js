const mongoose = require('mongoose')

var examSchema = mongoose.Schema({
    id: String,
    name: String,
    teacher: Array,
    faculty: String,
    timeStart: String,
    timeEnd: String,
    day: String,
    amongNisit: String,
    listNisit: Array,
    statusExam: String,
    examer: Array,
    room:String
})
module.exports = mongoose.model('exams', examSchema)