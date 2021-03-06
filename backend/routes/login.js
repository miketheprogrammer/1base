var mongoose    = require('mongoose');
var Rx          = require('rxjs');
var express     = require('express');
var app         = express.Router();
var schemas     = require('../schemas').mongoose;
const md5       = require('md5');

mongoose.connect('mongodb://localhost/1base');

app.post('/', function (req, res) {
    const User = mongoose.model('User', schemas.User);
    let username = req.body.username
    // username = { $regex : new RegExp(, 'i') };
    const password = md5(req.body.password);
    console.log(username);

    User.findOne({username}, function(err, user){
      if(err){
        return res.status(500).send(err);
      }
      if(!user){
        return res.status(404).send({result:false, code:404});
      }
      if(password === user.password) {
        req.session.loggedIn = true;
        req.session.username = username;
        req.session.id = user._id;
        return res.status(200).send({result:true, code:200});
      }
      return res.status(401).send({result:false, code:401});
    });
  });


module.exports = app;
