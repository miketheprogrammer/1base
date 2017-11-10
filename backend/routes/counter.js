var mongoose    = require('mongoose');
var Rx          = require('@reactivex/rxjs');
var express     = require('express');
var app         = express.Router();
var schemas     = require('../schemas').mongoose;

mongoose.connect('mongodb://localhost/1base');

app.get('/', function (req, res) {
  var Counter = mongoose.model('Counter', schemas.Counter);
  let name = req.params.name || 'global'
  Counter
    .findOne({ name })
    .select('counter')
    .exec((err, doc) => {
      let counter = 0;
      if (!err) {
        counter = doc.counter;
      }
      return res.status(200).send({counter});
    });
})

app.get('/increment/:name?', function (req, res) {
  var Counter = mongoose.model('Counter', schemas.Counter);
  let name = req.params.name || 'global'
  Counter.findOneAndUpdate({name}, {$inc: { counter: 1 }}, {upsert:true}, function(err, doc){
      if (err) {
        console.log('could not save global counter');
      }
      console.log('successfully saved global counter');
      res.status(200).send({ok: true})
  });
})

app.get('/decrement/:name?', function (req, res) {
  var Counter = mongoose.model('Counter', schemas.Counter);
  let name = req.params.name || 'global'
  Counter.findOneAndUpdate({name}, {$inc: { counter: -1 }}, {upsert:true}, function(err, doc){
      res.status(200).send({ok: true})
  });
})

module.exports = app;
