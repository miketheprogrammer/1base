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
  let user = new User({username:'dingle@aol.com', password:md5('jingles')})

  User.create(user, (_) => {});
  let counter = new Counter({name: 'global', counter: 2});
  Counter.create(counter, (_) => {});
});
