var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;


var Counter = exports.Counter = new Schema({
  name: String,
  counter:  Number,
});
