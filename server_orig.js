
// Module dependencies
var express = require('express')

var app = express()

//so when rendering jade files only need to write file name, not path
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

//so when trying to access css or js,  dont need to write path
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index')
})
app.get('/views/index.jade', function (req, res) {
  res.render('index')
})
app.get('/views/prep.jade', function (req, res) {
  res.render('prep')
})
app.get('/views/transcend.jade', function (req, res) {
  res.render('transcend')
})

app.listen(3000)