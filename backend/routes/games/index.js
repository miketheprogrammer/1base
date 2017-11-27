const mongoose    = require('mongoose');
const Rx          = require('@reactivex/rxjs');
const express     = require('express');
const app         = express.Router();
const schemas     = require('../../schemas').mongoose;

mongoose.connect('mongodb://localhost/1base');
const Game = mongoose.model('Game', schemas.Game);

app.get('/', (req, res, next) => {
  const userId = req.session.id;
  // Security whole need to ensure user belongs to org
  Game.find({organization: req.query.organization}, (err, organizations) => {
    if (err) {
      return res.status(500).send({error: err, code: 500})
    }
    if (!organizations) {
      return res.status(404).send({result: null, code: 404})
    }
    return res.status(200).send({result: organizations, code: 200});
  })
})
module.exports = app;

module.exports = app;
