const User = require('../schema/user.schema');
var newa = []
var status
exports.excel = (req, res) => {
    req.body.forEach(function (item) {
        User.findOne({ username: item.username }, (err, result) => {
            if (result == null) {
                newa.push(item)
                status = true
            } else {
                status = false
            }
        })
    });
}
exports.createExcel = (req, res) => {
    if (status == true) {
        User.create(newa, (err, result) => {
        })
    }
    console.log(newa)
}