const Subject = require('../schema/subject.schema');

exports.findAll = (req, res) => {
    Subject.find({}, function (err, obj) {
        if (!err) {
            res.json({ data: obj })
        }
    })
};

exports.findOne = (req, res) => {
    Subject.findOne({ _id: req.params.id }, (_, result) => {
        res.json({ data: result, status: true })
    })
};

exports.create = (req, res) => {
    Subject.findOne({ id: req.body.id }, (_, result) => {
        if (result === null) {
            const newSubject = new Subject({
                id: req.body.id,
                name: req.body.name,
                faculty: req.body.faculty,
                unit: req.body.unit
            })
            newSubject.save()
            res.json({ status: true })
        } else {
            res.json({ status: false })
        }
    })
}

exports.update = (req, res) => {
    Subject.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, () => {
        res.json({ status: true })
    });
}

exports.delete = (req, res) => {
    var idRemove = []
    req.body.forEach(function (item) {
        idRemove.push(item)
    })
    const query = { _id: { $in: idRemove } }
    Subject.deleteMany(query).then((err, result) => { res.json({ data: result }) })
}