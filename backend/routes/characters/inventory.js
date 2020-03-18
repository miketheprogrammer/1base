const mongoose    = require('mongoose');
const Rx          = require('rxjs');
const express     = require('express');
const app         = express.Router();
const schemas     = require('../../schemas').mongoose;

mongoose.connect('mongodb://localhost/1base');



module.exports = app;
