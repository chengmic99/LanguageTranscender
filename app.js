
// create server, set up routes

var express = require('express'); //app server
var fs = require('fs'); //file system for loading json
var bodyParser = require('body-parser'); //parser for post requests
var http = require('http');
var mime = require('mime');
var cookieParser = require('cookie-parser');
var cfenv = require('cfenv');

var vcapServices = require('vcap_services');

var appEnv = cfenv.getAppEnv();
var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('appName', 'LanguageTranscender');

app.set('port', process.env.PORT || 4000);


//so when rendering jade files only need to write file name, not path
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
//so when trying to access css or js,  dont need to write path
app.use(express.static(__dirname + '/public')) // load UI from public folder
app.use(bodyParser.json());

app.use('/', require("./router"));

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

http.createServer(app).listen(
  process.env.PORT || 4000,
  function(req, res) {
      console.log(app.get('appName')+' is listening on port: ' + app.get('port'));
  }
);





