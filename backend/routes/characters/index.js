const mongoose    = require('mongoose');
const Rx          = require('rxjs');
const express     = require('express');
const app         = express.Router();
const schemas     = require('../../schemas').mongoose;
const CharacterInventoryRouter = require('./inventory');
const CharacterStatisticsRouter = require('./statistics');
mongoose.connect('mongodb://localhost/1base');

const Character = mongoose.model('Character', schemas.Character);

app.use('/inventory', CharacterInventoryRouter);
app.use('/statistics', CharacterStatisticsRouter);

app.get('/', (req, res, next) => {
  const game = req.query.game;

  if (!game) {
    return res.status(403).send({error: "You are not allowed to execute broad queries.", code: 403});
  }

  let query = {game}

  if (req.query.ids) {
    query._id = {
      $in: req.query.ids.split(',')
    }
  }

  if (req.query.player) {
    query.player = req.query.player
  }

  if (req.query.search) {
    let search = new RegExp(req.query.search, 'i');
    query['$or'] = [
      {name: search},
      {player: search}
    ]
  }

  Character
    .find(query)
    .populate('inventory')
    .exec()
    .then((characters) => {
      return res.status(200).send({result: characters, code: 200});
    })
    .catch((err) => {
      return res.status(500).send({error: err.message, code: 500});
    })
});

app.get('/:characterId', (req, res, next) => {
  const _id = req.params.characterId;
  Character.findOne({_id}, (err, character) => {
    if (err) {
      return res.status(500).send({error: err, code: 500});
    }
    if (!character) {
      return res.status(404).send({result: null, code: 404});
    }
    return res.status(200).send({result: character, code: 200});
  });
});

app.post('/', (req, res, next) => {
  delete req.body._id;
  character = new Character(req.body);
  character.save((err, doc, numAffected) => {
    if (err) {
      return res.status(500).send({error: err, code: 500});
    }
    if (numAffected <= 0) {
      // check this maybe its not 409
      return res.status(409).send({error: "Could not post character", code: 409});
    }
    return res.status(201).send({result: doc._id});

  });
});

app.put('/:characterId', (req, res, next) => {
  const _id = req.params.characterId;

  Character.findOne({_id}, (err, character) => {
    if (err) {
      return res.status(500).send({error: err, code: 500});
    }
    if (!character) {
      return res.status(404).send({result: null, code: 404});
    }

    character = new Character(character);
    for (key in req.body) {
      character.set(key, req.body.key);
    }
    character.save();

  });
});

module.exports = app;
