var mongoose    = require('mongoose');
var Rx          = require('rxjs');
var express     = require('express');
var app         = express.Router();
var schemas     = require('../schemas').influx;
