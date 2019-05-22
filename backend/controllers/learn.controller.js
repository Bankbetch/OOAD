const Learn = require('../schema/learn.schema');

exports.create = (req, res) => {
    Learn.findOne({ id: req.body.id }, (_, result) => {
        if (result === null) {
            Learn.create(req.body, (err, result) => { })
            res.json({ status: true })
        } else {
            res.json({ status: false })
        }
    });
}
exports.findAll = (req, res) => {
    Learn.find({}, function (err, obj) {
        if (!err) {
            res.json({ data: obj })
        }
    })
}
exports.update = (req, res) => {
    const dataUpdate = {
        id: req.body.id,
        name: req.body.name,
        teacher: req.body.teacher,
        faculty: req.body.faculty,
        build: req.body.build,
        unit: req.body.unit,
        year: req.body.year,
        term: req.body.term,
        room: req.body.room,
        day: req.body.day,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        sit: req.body.sit,
        student: req.body.student
    };
    Learn.findOneAndUpdate({ id: req.body.id }, { $set: dataUpdate }, () => {
        res.json({ status: true })
    });
}

exports.delete = (req, res) => {
    var idRemove = []
    req.body.forEach(function (item) {
        idRemove.push(item)
    })
    const query = { _id: { $in: idRemove } }
    Learn.deleteMany(query).then((obj) => { res.json({ data: obj }) })
}