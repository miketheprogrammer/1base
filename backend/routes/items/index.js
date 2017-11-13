const mongoose    = require('mongoose');
const Rx          = require('@reactivex/rxjs');
const express     = require('express');
const app         = express.Router();
const schemas     = require('../../schemas').mongoose;

mongoose.connect('mongodb://localhost/1base');
const Item = mongoose.model('Item', schemas.Item);

module.exports = app;
