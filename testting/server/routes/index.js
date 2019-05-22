var express = require('express');
var router = express.Router();
var Blob = require('../models/blob');
var Exam = require('../models/exam.schema');

router.get('/', function(req, res, next) {
    res.send('Hello, World!');
});

// *** api routes *** //
router.get('/blobs', findAllBlobs);
router.get('/blob/:id', findBlobById);
router.post('/blobs', addBlob);
router.put('/blob/:id', updateBlob);
router.delete('/blob/:id', deleteBlob);

router.get('/exams', findAllExams);
router.get('/exam/:id', findExamById);
router.post('/exams', addExam);
router.put('/exam/:id', updateExam);
router.delete('/exam/:id', deleteExam);

// *** get ALL blobs *** //
function findAllBlobs(req, res) {
    Blob.find(function(err, blobs) {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            res.json(blobs);
        }
    });
}

// *** get SINGLE blobs *** //
function findBlobById(req, res) {
    Blob.findById(req.params.id, function(err, blob) {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            res.json(blob);
        }
    });
}

// *** post ALL blobs *** //
function addBlob(req, res) {
    var newBlob = new Blob({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        types: req.body.types,
        email: req.body.email

    });
    newBlob.save(function(err) {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            res.json({ 'SUCCESS': newBlob });
        }
    });
}

// *** put SINGLE blob *** //
function updateBlob(req, res) {
    Blob.findById(req.params.id, function(err, blob) {
        blob.name = req.body.name;
        blob.surname = req.body.surname;
        blob.username = req.body.username;
        blob.password = req.body.password;
        blob.types = req.body.types;
        blob.email = req.body.email;
        blob.save(function(err) {
            if (err) {
                res.json({ 'ERROR': err });
            } else {
                res.json({ 'UPDATED': blob });
            }
        });
    });
}

// *** delete SINGLE blob *** //
function deleteBlob(req, res) {
    Blob.findById(req.params.id, function(err, blob) {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            blob.remove(function(err) {
                if (err) {
                    res.json({ 'ERROR': err });
                } else {
                    res.json({ 'REMOVED': blob });
                }
            });
        }
    });
}

// *** get ALL Exam *** //
function findAllExams(req, res) {
    Exam.find(function(err, exams) {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            res.json(exams);
        }
    });
}

// *** get SINGLE Exam *** //
function findExamById(req, res) {
    Exam.findById( req.params.id , function(err, exam) {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            res.json(exam);
        }
    });
}

// *** post ALL Exams *** //
function addExam(req, res) {
    var newExam = new Exam({
        idExam: req.body.idExam,
        name: req.body.name,
        teacher: req.body.teacher,
        faculty: req.body.faculty,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        date: req.body.date,
        term: req.body.term,
        listNisit: req.body.listNisit,
        amongNisit: req.body.amongNisit,
        statusExam: req.body.statusExam,
        examer: req.body.examer,
        room: req.body.room

    });
    newExam.save(function(err) {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            res.json({ 'SUCCESS': newExam });
        }
    });
}

// *** put SINGLE Exam *** //
function updateExam(req, res) {
    Exam.findById(req.params.id, function(err, exam) {
        exam.idExam = req.body.idExam;
        exam.name = req.body.name;
        exam.teacher = req.body.teacher;
        exam.faculty = req.body.faculty;
        exam.timeStart = req.body.timeStart;
        exam.timeEnd = req.body.timeEnd;
        exam.date = req.body.date;
        exam.listNisit = req.body.listNisit;
        exam.amongNisit = req.body.amongNisit;
        exam.statusExam = req.body.statusExam;
        exam.examer = req.body.examer;
        exam.room = req.body.room
        exam.save(function(err) {
            if (err) {
                res.json({ 'ERROR': err });
            } else {
                res.json({ 'UPDATED': exam });
            }
        });
    });
}

// *** delete SINGLE Exam *** //
function deleteExam(req, res) {
    Exam.findById(req.params.id, function(err, exam) {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            exam.remove(function(err) {
                if (err) {
                    res.json({ 'ERROR': err });
                } else {
                    res.json({ 'REMOVED': exam });
                }
            });
        }
    });
}


module.exports = router;