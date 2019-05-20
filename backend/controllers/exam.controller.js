const Exam = require('../schema/exam.schema');

exports.findAll = (req, res) => {
    Exam.find({}, function(err, obj) {
        if (!err) {
            res.json({ data: obj })
        }
    })
}

exports.find = (req, res) => {
    Exam.find({ id: req.params.id }, function(err, obj) {
        if (!err) {
            res.json({ data: obj })
        }
    })
}

exports.create = (req, res) => {
    Exam.findOne({ id: req.body.id }, (_, result) => {
        if (result === null) {
            Exam.create(req.body, (err, result) => {})
            res.json({ status: true })
        } else {
            res.json({ status: false })
        }
    });
}

exports.update = (req, res) => {
    Exam.findOneAndUpdate({ id: req.body.id }, { $set: req.body }, () => {
        res.json({ status: true })
    });
}

exports.updateStatus = (req, res) => {
    const dataUpdate = {
        statusExam: req.body.statusExam
    };
    Exam.findOneAndUpdate({ _id: req.body.id }, { $set: dataUpdate }, () => {
        res.json({ status: true })
    });
}

exports.delete = (req, res) => {
    var idRemove = []
    req.body.forEach(function(item) {
        idRemove.push(item)
    })
    const query = { _id: { $in: idRemove } }
    Exam.deleteMany(query).then((obj) => { res.json({ data: obj }) })
}