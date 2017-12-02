var Influx = require('influx');
exports.ExpressResponseTimes = [
  {
    measurement: 'response_times',
    fields: {
      path: Influx.FieldType.STRING,
      duration: Influx.FieldType.INTEGER
    },
    tags: [
      'host',
      'request_path'
    ]
  },
  {
    measurement: 'logins',
    fields: {
      count: Influx.FieldType.INTEGER,
    },
    tags: [
      'organization',
      'game',
      'user',
      'type',
      'date',
    ]
  }
]
