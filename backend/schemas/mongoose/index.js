var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;


var Counter = exports.Counter = new Schema({
  name: {
    type: String,
    index: true,
    unique: true,
  },
  counter:  Number,
});

var User = exports.User = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
  },
  password:  String,
  created: Date
});
