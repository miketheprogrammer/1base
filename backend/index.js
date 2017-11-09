var express = require('express')
var app = express()

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/api/', function (req, res) {
  res.status(200).send({
    counter: 0
  });
})

app.listen(3001)
