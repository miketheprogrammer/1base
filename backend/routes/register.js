const mongoose    = require('mongoose');
const Rx          = require('rxjs');
const express     = require('express');
const app         = express.Router();
const schemas     = require('../schemas').mongoose;
const md5         = require('md5');

mongoose.connect('mongodb://localhost/1base');
const User = mongoose.model('User', schemas.User);

app.get('/:username', function (req, res) {
  let username = req.params.username;
  User
    .findOne({username})
    .select("username created")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({error: err, code: 500});
      }
      if (!user) {
        res.status(404).send({error: err, code: 404});
      }
      res.status(200).send({result:user});

    });
});

app.post('/', function (req,res){
  const username = req.body.username;
  const password = md5(req.body.password);
  let user = new User({username, password});
  User.create(user, function(err, user){
    if(err){
      res.status(500).send(err);
    } else {
      res.status(201).send({result: user._id});
    }
  });
});

app.put('/:userId', (req, res, next) => {
  const _id = req.params.userId;
  User.findOne({_id}, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(404).send({result: false});
    }

    user = new User(user);
    for (key in req.body) {
      user[key] = req.body[key];
    }

    user.save((err, user) => {
      if (err) {
        return res.status(500).send({error: err, code: 500});
      }
      if (!user) {
        return res.status(404).send({result: false, code: 404});
      }
      return res.status(200).send({result: user._id, code: 200});
    });
  });

  user._id = _id;
  user.save();

});

// Counter.findOneAndUpdate({name: 'global'}, {name: 'global', counter: 2}, {upsert:true}, function(err, doc){
//     if (err) {
//       console.log('could not save global counter');
//     }
//     return console.log('successfully saved global counter');
// });

module.exports = app;
