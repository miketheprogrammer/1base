var mongoose    = require('mongoose');
var Rx          = require('@reactivex/rxjs');
var express     = require('express');
var app         = express.Router();
var schemas     = require('../schemas').mongoose;
const md5       = require(md5);

mongoose.connect('mongodb://localhost/1base');

app.post('/', function (req, res) {
    const User = mongoose.model('User', schemas.User);
    const username = req.body.username;
    const password = md5(req.body.password);
    User.findOne({username}, function(err, user){
      if(err){
        return res.status(500).send(err);
      }
      if(!user){
        return res.status(404).send({result:false, code:404});
      }
      if(password===user.password){
        return res.status(200).send({result:true, code:200});
      }
      return res.status(401).send({result:false, code:401});
    });
  });
