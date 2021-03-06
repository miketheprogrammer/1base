const mongoose    = require('mongoose');
const Rx          = require('rxjs');
const express     = require('express');
const app         = express.Router();
const schemas     = require('../../schemas').mongoose;

mongoose.connect('mongodb://localhost/1base');
const Organization = mongoose.model('Organization', schemas.Organization);

app.get('/', (req, res, next) => {
  const userId = req.session.id;
  Organization.find({$or: [{owner: userId}, {members: userId}]}, (err, organizations) => {
    if (err) {
      return res.status(500).send({error: err, code: 500})
    }
    if (!organizations) {
      return res.status(404).send({result: null, code: 404})
    }
    return res.status(200).send({result: organizations, code: 200});
  })
})

app.post('/', (req, res) => {
  org = new Organization(req.body);
  org.owner = req.session.id;
  org.save(() => {
    res.status(201).send({result: true});
  })

})
module.exports = app;
