var Influx = require('influx');
exports.internalStats = [
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
  },
  {
    measurement: 'registrations',
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
  },
  {
    measurement: 'profile_updates',
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
  },
  {
    measurement: 'daily_active',
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
  },
]
