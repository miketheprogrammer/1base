const mongoose    = require('mongoose');
const Rx          = require('@reactivex/rxjs');
const express     = require('express');
const app         = express.Router();
const schemas     = require('../../schemas').mongoose;
const PlayerInventoryRouter = require('./inventory');
const PlayerStatisticsRouter = require('./statistics');
mongoose.connect('mongodb://localhost/1base');

const Player = mongoose.model('Player', schemas.Player);

app.use('/inventory', PlayerInventoryRouter);
app.use('/statistics', PlayerStatisticsRouter);

app.get('/:playerId', (req, res, next) => {
  const _id = req.params.playerId;
  Player.findOne({_id}, (err, player) => {
    if (err) {
      return res.status(500).send({error: err, code: 500})
    }
    if (!player) {
      return res.status(404).send({result: null, code: 404})
    }
    return res.status(200).send({result: player, code: 200});
  });
});

app.post('/', (req, res, next) => {
  delete req.body._id;
  player = new Player(req.body);
  player.save((err, doc, numAffected) => {
    if (err) {
      return res.status(500).send({error: err, code: 500})
    }
    if (numAffected <= 0) {
      // check this maybe its not 409
      return res.status(409).send({error: "Could not post player", code: 409});
    }
    return res.status(201).send({result: doc._id});

  })
});

app.put('/:playerId', (req, res, next) => {
  const _id = req.params.playerId;

  Player.findOne({_id}, (err, player) => {
    if (err) {
      return res.status(500).send({error: err, code: 500})
    }
    if (!player) {
      return res.status(404).send({result: null, code: 404})
    }

    player = new Player(player);
    for (key in req.body) {
      player.set(key, req.body.key);
    }
    player.save();

  })
})

module.exports = app;
