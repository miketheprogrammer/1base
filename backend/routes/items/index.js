const mongoose    = require('mongoose');
const Rx          = require('rxjs');
const express     = require('express');
const app         = express.Router();
const schemas     = require('../../schemas').mongoose;

mongoose.connect('mongodb://localhost/1base');
const Item = mongoose.model('Item', schemas.Item);

app.get('/', (req, res, next) => {
  const userId = req.session.id;
  let query = {game: req.query.game};
  if (req.query.search) {
    let search = new RegExp(req.query.search, 'i');
    query['$or'] = [
      {name: search},
      {type: search},
      {tags: search},
      {folder: search}
    ]
  }
  Item.find(query, (err, items) => {
    if (err) {
      return res.status(500).send({error: err, code: 500})
    }
    items = items || []
    return res.status(200).send({result: items, code: 200});
  });
})

app.get('/:id', (req, res, next) => {
  let query = {game: req.query.game, _id: req.query.id};
  Item
    .findOne(query)
    .exec()
    .then((item) => {
      return res.status(200).send({result: item, code: 200});
    })
    .catch((err) => {
      return res.status(500).send({error: err.message, code: 500})
    })

})

app.post('/', (req, res, next) => {
  const item = new Item(req.body);
  item
    .save()
    .then((result) => {
      return res.status(200).send({result: true, code: 200});
    })
    .catch(next);
})
module.exports = app;
