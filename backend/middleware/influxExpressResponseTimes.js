var Influx      = require('influx');
var Rx          = require('@reactivex/rxjs');
var os          = require('os')
var schemas     = require('../schemas').influx;

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'express_response_db',
  schema: schemas.ExpressResponseTimes
})

module.exports = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`Request to ${req.path} took ${duration}ms`);

    influx.writePoints([
      {
        measurement: 'response_times',
        tags: { host: os.hostname(), request_path: req.path },
        fields: { duration, path: req.path },
      }
    ]).catch(err => {
      console.error(`Error saving data to InfluxDB! ${err.stack}`)
    })
  })
  return next()
}
