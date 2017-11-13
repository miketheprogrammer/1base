var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var Rx          = require('@reactivex/rxjs');
var Influx      = require('influx');
var os          = require('os');
var routes      = require('./routes');
var schemas     = require('./schemas');
var middleware  = require('./middleware');
var bodyParser  = require('body-parser');
const md5       = require('md5');



// Boiler plate setup of databases
const influx = new Influx.InfluxDB({
  host: 'localhost',
});

mongoose.connect('mongodb://localhost/1base');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Top-Level Middleware
app.use(middleware.influxExpressResponseTimes);

// Routes using sub routers
app.use('/api/counter/', routes.counter);
app.use('/api/register/', routes.register);

// ServerStarted observable
let serverStarted$ = new Rx.Subject();

// Start Influx and maybe mongo and do ensureIndexes and ensure influx databases
influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('express_response_db')) {
      return influx.createDatabase('express_response_db');
    }
  })
  .then(() => {
    // trigger the server start
    app.listen(3001, serverStarted$.next.bind(serverStarted$));
  })
  .catch(err => {
    console.error(`Error creating Influx database!`);
  });

// server has started callback
serverStarted$.subscribe(() => {
  console.log('Server Started');
  var Counter = mongoose.model('Counter', schemas.mongoose.Counter);
  const User= mongoose.model('User', schemas.mongoose.User);
  // Ensure the global counter is created
  User.findOneAndUpdate({username:'dingle@aol.com'}, {username:'dingle@aol.com', password:md5('jingles'), created: new Date()}, {upsert:true}, function(err, doc){
    console.log("nipples", err, doc);
  });

  Counter.findOneAndUpdate({name: 'global'}, {name: 'global', counter: 2}, {upsert:true}, function(err, doc){
      if (err) {
        console.log('could not save global counter');
      }
      console.log("dick", doc);
      return console.log('successfully saved global counter');
  });
});
