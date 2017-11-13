const mongoose    = require('mongoose');
const Rx          = require('@reactivex/rxjs');
const express     = require('express');
const app         = express.Router();
const schemas     = require('../schemas').mongoose;
const md5         = require('md5');

mongoose.connect('mongodb://localhost/1base');

app.get('/:username', function (req, res) {
  const User = mongoose.model('User', schemas.User);
  let username = req.params.username;
  User
    .findOne({username})
    .select("username created")
    .exec((err, doc) => {
      if (err|| !doc) {
        res.status(500).send(err);
      } else {
        res.send({result:doc});
      }
    });
});

app.post('/', function (req,res){
  const User = mongoose.model('User', schemas.User);
  const username = req.body.username;
  const password = md5(req.body.password);
  User.findOneAndUpdate({username}, {username, password}, {upsert:true}, function(err, doc){
    if(err){
      res.status(500).send(err);
    }else {
      res.send({result:true});
    }
  });
});

// Counter.findOneAndUpdate({name: 'global'}, {name: 'global', counter: 2}, {upsert:true}, function(err, doc){
//     if (err) {
//       console.log('could not save global counter');
//     }
//     return console.log('successfully saved global counter');
// });

module.exports = app;
