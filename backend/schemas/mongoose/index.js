var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;


var Counter = exports.Counter = new Schema({
  name: String,
  counter:  Number,
});

var User = exports.User = new Schema({
  username: String,
  password:  String,
  created: Date
});
