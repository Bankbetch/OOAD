const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 4001
const userModel = require('../schema/user.schema')
const subjectModel = require('../schema/subject.schema')
const buildModel = require('../schema/build.schema')
const roomModel = require('../schema/room.schema')

app.use(bodyParser.json())
app.use(cors({ origin: true }))
app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/login/:id', (req, res) => {
//     userModel.findOne({ username: req.params.id }, (err, obj) => {
//         if (obj !== null || obj !== "") {
//             res.json({ data: obj, status: true })
//         } else {
//             res.json({ status: false })
//         }
//     })
// })

// app.get('/getdata', (req, res) => {
//     userModel.find({}, function (err, obj) {
//         if (!err) {
//             res.json({ data: obj })
//         }
//     });
// })

// app.post('/settinguser', (req, res) => {
//     userModel.findOne({ username: req.body.username }, (_, result) => {
//         if (result === null) {
//             const newUser = new userModel({
//                 name: req.body.name,
//                 surname: req.body.surname,
//                 username: req.body.username,
//                 password: req.body.password,
//                 types: req.body.types,
//                 email: req.body.email
//             });
//             newUser.save()
//             res.json({ status: true })
//         } else {
//             res.json({ status: false })
//         }
//     });
// })

// app.post('/deletedata', (req, res) => {
//     req.body.forEach(function (item) {
//         userModel.findByIdAndRemove(item).then(() => { res.json({ data: obj }) })
//     })
// })

// app.patch('/getdata', (req, res) => {
//     const dataUpdate = {
//         name: req.body.name,
//         surname: req.body.surname,
//         username: req.body.username,
//         types: req.body.types,
//         email: req.body.email
//     };
//     userModel.findOneAndUpdate({ username: req.body.username }, { $set: dataUpdate }, () => {
//         res.json({ status: true })
//     });
// })

var newa = []
var status
app.post('/excel', (req, res) => {
    const db = client.db(dbName)
    req.body.forEach(function (item) {
        userModel.collection('users').findOne({ username: item.username }, (err, result) => {
            if (result == null) {
                newa.push(item)
                status = true
            } else {
                status = false
            }
        })
    });
})

//อันนี้ฝากเช็คด้วยไม่รู้ถูกไหมม บักหลาม
app.post('/excel/insert', (req, res) => {
    if (status == true) {
        const newUserExcel = new userModel()
        newUserExcel = newa
        newUserExcel.save()
    }
})

app.post('/tablesubject', (req, res) => {
    subjectModel.findOne({ id: req.body.id }, (err, result) => {
        if (result === null) {
            console.log(req.body)
            subjectModel.create(req.body, (err, result) => {
            })
            res.json({ status: true })
        } else {
            console.log(req.body)
            res.json({ status: false })
        }
    })
})
app.patch('/tablesubject/', (req, res) => {
    subjectModel.updateOnefindOneAndUpdate({ id: req.body.id }, { $set: req.body }, () => {
        res.json({ status: true })
    });
})

app.get('/tablesubject/', (req, res) => {
    subjectModel.find((err, doc) => {
        res.json({ data: doc })
    })
})

app.get('/tablesubject/:id', (req, res) => {
    subjectModel.findOne({ _id: req.params.id }, (err, result) => {
        res.json({ data: result, status: true })
    })
})

app.post('/tablesubject/delete', (req, res) => {
    var idRemove = []
    req.body.forEach(function (item) {
        idRemove.push(item)
    })
    const query = { _id: { $in: idRemove } }
    subjectModel.findByIdAndRemove(query).then((err, result) => { res.json({ data: result }) })

})

// app.get('/getbuild/', (req, res) => {
//     buildModel.find((err, doc) => {
//         res.json({ data: doc })
//     })
// })

// app.post('/insertBuilds', (req, res) => {
//     buildModel.findOne({ name: req.body.name }, (err, result) => {
//         if (result === null) {
//             console.log(req.body)
//             buildModel.create(req.body, (err, result) => {
//             })
//             res.json({ status: true })
//         } else {
//             console.log(req.body)
//             res.json({ status: false })
//         }
//     })
// })

// app.post('/deleteBuilds', (req, res) => {
//     var idRemove = []
//     req.body.forEach(function (item) {
//         idRemove.push(item)
//     })
//     const query = { _id: { $in: idRemove } }
//     buildModel.deleteMany(query).then((err, result) => { res.json({ data: result }) })

// })

// app.patch('/editBuilds/', (req, res) => {
//     buildModel.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, () => {
//         res.json({ status: true })
//     });
//     console.log(req.body)
// })

// app.post('/addroom', (req, res) => {
//     roomModel.findOne({ room: req.body.room }, (err, result) => {
//         if (result === null) {
//             const newRoom = new roomModel({
//                 build: req.body.build,
//                 room: req.body.room,
//                 sit: req.body.sit,
//                 status: req.body.status,
//                 mon: req.body.time,
//                 tue: req.body.time,
//                 wed: req.body.time,
//                 thu: req.body.time,
//                 fri: req.body.time,
//                 sat: req.body.time,
//                 sun: req.body.time
//             })
//             newRoom.save()
//             res.json({ status: true })
//         } else {
//             console.log("fail")
//             res.json({ status: false })
//         }
//     })
// })
// app.get('/getroom', (req, res) => {
//     roomModel.find((err, doc) => {
//         res.json({ data: doc })
//     })
// })

// app.patch('/editroom/', (req, res) => {
//     roomModel.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, () => {
//         res.json({ status: true })
//     });
// })

// app.post('/deleteroom', (req, res) => {
//     var idRemove = []
//     req.body.forEach(function (item) {
//         idRemove.push(item)
//     })
//     const query = { _id: { $in: idRemove } }
//     roomModel.deleteMany(query).then((err, result) => { res.json({ data: result }) })
// })
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})

