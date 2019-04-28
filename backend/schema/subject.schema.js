const mongoose = require('mongoose');

var subjectSchema = mongoose.Schema({
    id: String, 
    name: String, 
    faculty: String,
    unit: String,
});

module.exports = mongoose.model('tablesubjects', subjectSchema)