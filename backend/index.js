var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var Rx          = require('@reactivex/rxjs');
var Influx      = require('influx');
var os          = require('os')
var routes      = require('./routes');
var schemas     = require('./schemas');
var middleware  = require('./middleware');

// Boiler plate setup of databases
const influx = new Influx.InfluxDB({
  host: 'localhost',
})

mongoose.connect('mongodb://localhost/1base');

// Top-Level Middleware
app.use(middleware.influxExpressResponseTimes)

// Routes using sub routers
app.use('/api/counter/', routes.counter);

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
  })

// server has started callback
serverStarted$.subscribe(() => {
  console.log('Server Started');
  var Counter = mongoose.model('Counter', schemas.mongoose.Counter);

  // Ensure the global counter is created
  Counter.findOneAndUpdate({name: 'global'}, {name: 'global', counter: 2}, {upsert:true}, function(err, doc){
      if (err) {
        console.log('could not save global counter');
      }
      return console.log('successfully saved global counter');
  });
});
