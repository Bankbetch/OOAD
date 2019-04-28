const Room = require('../schema/room.schema');

exports.findAll = (req, res) => {
    Room.find({}, function (err, obj) {
        if (!err) {
            res.json({ data: obj })
        }
    })
};

exports.create = (req, res) => {
    Room.findOne({ room: req.body.room }, (_, result) => {
        if (result === null) {
            const newRoom = new Room({
                build: req.body.build,
                room: req.body.room,
                sit: req.body.sit,
                status: req.body.status,
                mon: req.body.time,
                tue: req.body.time,
                wed: req.body.time,
                thu: req.body.time,
                fri: req.body.time,
                sat: req.body.time,
                sun: req.body.time
            })
            newRoom.save()
            res.json({ status: true })
        } else {
            res.json({ status: false })
        }
    });
}

exports.update = (req, res) => {
    Room.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, () => {
        res.json({ status: true })
    });
}

exports.delete = (req, res) => {
    req.body.forEach(function (item) {
        Room.findByIdAndRemove(item).then((obj) => { res.json({ data: obj }) })
    })
}

