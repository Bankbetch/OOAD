const moogoose = require('moogoose')

var excameSchema = moogoose.Schema({
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
    examer: Array
})
module.exports = moogoose.model('exams', excameSchema)