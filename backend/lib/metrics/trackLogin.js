var Influx      = require('influx');
var Rx          = require('@reactivex/rxjs');
var os          = require('os')

module.exports = (influx) => (type, organization_id, game_id, user, count=1) => {

  let tags = {type, user, date: Date.now()}
  if (organization_id) tags['organization'] = organization_id
  if (game_id) tags['game'] = game_id
  const point = {
    measurement: 'logins',
    tags: tags,
    fields: { count },
  }
  console.log('writing point', point)
  influx.writePoints([
    point
  ]).catch(err => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  }).then(() => console.log('writing player_logins', { organization_id: "myorg", player_id: "myplayer", date: Date.now() }))
}
