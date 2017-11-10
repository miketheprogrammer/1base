var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var Rx          = require('@reactivex/rxjs');
var Influx      = require('influx');
var os          = require('os')
var routes      = require('./routes');
var schemas     = require('./schemas');
var middleware  = require('./middleware');

const influx = new Influx.InfluxDB({
  host: 'localhost',
})

mongoose.connect('mongodb://localhost/1base');

Rx.Observable.of('Starting Server')
  .subscribe(function(x) { console.log(x); });

mongoose.connect('mongodb://localhost/1base');

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.use(middleware.influxExpressResponseTimes)

app.use('/api/counter/', routes.counter);

let serverStarted$ = new Rx.Subject();

influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('express_response_db')) {
      return influx.createDatabase('express_response_db');
    }
  })
  .then(() => {
    app.listen(3001, serverStarted$.next.bind(serverStarted$));
  })
  .catch(err => {
    console.error(`Error creating Influx database!`);
  })


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
