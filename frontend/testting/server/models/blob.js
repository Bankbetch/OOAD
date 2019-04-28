var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blobSchema = new Schema({
  name: String,
  surname: String,
  username: String,
  password: String,
  types: String,
  email: String
});


module.exports = mongoose.model('users', blobSchema);
