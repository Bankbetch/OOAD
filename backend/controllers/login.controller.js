const User = require('../schema/user.schema');

exports.findOne = (req, res) => {
    User.findOne({ username: req.params.id }).then(doc => {
        if (doc !== null || doc !== "") {
            res.json({ data: doc, status: true })
        } else {
            res.json({ status: false })
        }
    })
};

