var express = require('express')
var app = express()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database');

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/api/counter', function (req, res) {
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

app.get('/api/counter/increment/:name?', function (req, res) {
  let name = req.params.name || 'global'
  Counter.findOneAndUpdate({name}, {$inc: { counter: 1 }}, {upsert:true}, function(err, doc){
      if (err) {
        console.log('could not save global counter');
      }
      console.log('successfully saved global counter');
      res.status(200).send({ok: true})
  });
})

app.get('/api/counter/decrement/:name?', function (req, res) {
  let name = req.params.name || 'global'
  Counter.findOneAndUpdate({name}, {$inc: { counter: -1 }}, {upsert:true}, function(err, doc){
      if (err) {
        console.log('could not save global counter');
      }
      console.log('successfully saved global counter');
      res.status(200).send({ok: true})
  });
})

app.listen(3001)

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
  name: String,
  counter:  Number,
});

var Counter = mongoose.model('Counter', counterSchema);

// Ensure the global counter is created
Counter.findOneAndUpdate({name: 'global'}, {name: 'global', counter: 2}, {upsert:true}, function(err, doc){
    if (err) {
      console.log('could not save global counter');
    }
    return console.log('successfully saved global counter');
});
