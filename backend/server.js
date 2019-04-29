const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  auth: {
    user: 'admin',
    password: 'a123456'
  }
})

mongoose.connection.on('connected',function(){
    console.log('Mongoose defualt connect open')
})

mongoose.connection.on('error',function(err){
    console.log('Mongoose defualt connection error: ' + err)
})

mongoose.connection.on('disconnected',function(){
    console.log('Mongoose defualt connect disconnected')
})
require('./routes/login.routes')(app);
require('./routes/user.routes')(app);
require('./routes/build.routes')(app);
require('./routes/room.routes')(app);
require('./routes/subject.routes')(app);
require('./routes/learn.routes')(app);

app.listen(4001, () => {
    console.log("Server is listening on port 4001");
});

