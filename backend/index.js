const express     = require('express');
const app         = express();
const mongoose    = require('mongoose');
const Rx          = require('@reactivex/rxjs');
const Influx      = require('influx');
const os          = require('os');
const routes      = require('./routes');
const schemas     = require('./schemas');
const middleware  = require('./middleware');
const bodyParser  = require('body-parser');
const md5         = require('md5');
const metrics     = require('./lib/metrics');
var cookieSession = require('cookie-session')

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'express_response_db',
  schema: schemas.influx.ExpressResponseTimes
});

mongoose.connect('mongodb://localhost/1base');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Top-Level Middleware
app.use(middleware.influxExpressResponseTimes(influx));

app.use(cookieSession({
  name: 'stuff',
  keys: ['justinsdirtysecret'],

  // Cookie Options
  maxAge: 2 * 24 * 60 * 60 * 1000 // 24 hours
}))

app.get('/session', (req, res) => {
  res.status(200).send(req.session);
})
app.get('/logout', (req, res) => {
  req.session = null
  res.status(200).send()
})
// Routes using sub routers
app.use('/api/counter/', routes.counter);
app.use('/api/register/', routes.register);
app.use('/api/login', routes.login);
app.use('/api/players', routes.players);
app.use('/api/organizations', routes.organizations)
app.use('/api/games', routes.games)


app.get('/api/whoami', (req, res) => {
  if (req.session.loggedIn) {
    metrics.trackLogin(influx)('user', req.query.organization, req.query.game, req.query.user || req.session.id)
    return res.status(200).send({result: true});
  }
  return res.status(401).send({result: false});
})

app.get('/api/metrics', (req, res) => {
  let game = req.query.game;
  let organization = req.query.organization;
  let user = req.query.user;
  let type = req.query.type || 'user';
  let userQuery = '',
      organizationQuery = '',
      gameQuery = '';

  if (user) userQuery = `AND "user" = '${user}'`
  if (organization) organizationQuery = `AND "organization" = '${organization}'`
  if (game) gameQuery = `AND "game" = '${game}'`
  queryString = `
    SELECT sum("count")
      FROM "logins"
      WHERE (
        "type" = '${type}'
          ${organizationQuery}
          ${gameQuery}
          ${userQuery})
        AND time >= now() - 1d
      GROUP BY time(1d)`
  // console.log(queryString)
  let query = influx.query(queryString)
  query
  .catch((err) => {
    return res.status(200).send([{err: err.message}]);
  })
  .then((rows => {
    rows = rows || []
    if(rows.length > 1)
      return res.status(200).send(rows[rows.length - 1]);
    return res.status(200).send(rows);
  }))
})

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
  let user = new User({username:'dingle@aol.com', password:md5('jingles'), admin: true});

  User.create(user, (_) => {});
  let counter = new Counter({name: 'global', counter: 2});
  Counter.create(counter, (_) => {});
});
