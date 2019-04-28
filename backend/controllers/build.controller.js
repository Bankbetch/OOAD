const Build = require('../schema/build.schema');

exports.findAll = (req, res) => {
    Build.find({}, function (err, obj) {
        if (!err) {
            res.json({ data: obj })
        }
    })
};

exports.create = (req, res) => {
    Build.findOne({ name: req.body.name }, (_, result) => {
        if (result === null) {
            const newBuild = new Build({
                name: req.body.name,
                amongRoom: req.body.amongRoom,
            })
            newBuild.save()
            res.json({ status: true })
        } else {
            res.json({ status: false })
        }
    });
}

exports.update = (req, res) => {
    Build.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, () => {
        res.json({ status: true })
    });
}

exports.delete = (req, res) => {
    req.body.forEach(function (item) {
        Build.findByIdAndRemove(item).then((obj) => { res.json({ data: obj }) })
    })
}

