const User = require('../schema/user.schema');

exports.findAll = (req, res) => {
    User.find({}, function (err, obj) {
        if (!err) {
            res.json({ data: obj })
        }
    })
};

exports.create = (req, res) => {
    User.findOne({ username: req.body.username }, (_, result) => {
        if (result === null) {
            const newUser = new User({
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                password: req.body.password,
                types: req.body.types,
                email: req.body.email
            });
            newUser.save()
            res.json({ status: true })
        } else {
            res.json({ status: false })
        }
    });
}

exports.update = (req, res) => {
    const dataUpdate = {
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        types: req.body.types,
        email: req.body.email
    };
    User.findOneAndUpdate({ username: req.body.username }, { $set: dataUpdate }, () => {
        res.json({ status: true })
    });
}

exports.delete = (req, res) => {
    req.body.forEach(function (item) {
        User.findByIdAndRemove(item).then((obj) => { res.json({ data: obj }) })
    })
}
