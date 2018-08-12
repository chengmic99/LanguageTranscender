
/////////////////////////////////// IMPORT MODULES ///////////////////////////////////
var express = require('express'); //app server
var fs = require('fs'); //file system for loading json
var bodyParser = require('body-parser'); //parser for post requests

var AuthorizationV1 = require('watson-developer-cloud/authorization/v1');
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1'); 
var recognizeMicrophone = require('watson-speech/speech-to-text/recognize-microphone');
var watsonSpeech = require('watson-speech')
var LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');
var IamTokenManagerV1 = require('watson-developer-cloud/iam-token-manager/v1');

// var browserify = require('browserify');
// var WebSocket = require('ws')


/////////////////////////////////// CONSTRUCTORS/AUTHs ///////////////////////////////////
var app = express()
var stt = new SpeechToTextV1({
    "url": process.env.STT_URL,
    "username": process.env.STT_USERNAME,
    "password": process.env.STT_PASSWORD
})
// var lt = new LanguageTranslatorV3({
//     "version": process.env.LT_VERSION,
//     "iam_apikey": process.env.LT_IAM_APIKEY,
//     "iam_apikey_description": process.env.LT_IAM_APIKEY_DESCRIPTION,
//     "iam_apikey_name": process.env.LT_IAM_APIKEY_NAME,
//     "iam_role_crn": process.env.LT_IAM_ROLE_CRN,
//     "iam_serviceid_crn": process.env.LT_IAM_SERVICEID_CRN,
//     "url": process.env.LT_URL
// });

var sttAuthService = new AuthorizationV1({
  username: "16313d89-848b-4573-b1d4-0e67fd3e9d24",
  password: "5r5Nuc2oabXM",
  url: 'https://stream.watsonplatform.net/authorization/api'
});


app.get('/api/speech-to-text/token', function(req, res) {
  console.log('ok, lets do this');

  var params = {
    url: process.env.STT_URL
  };
  
  sttAuthService.getToken(params, function (err, token) {
    if (!token) {
      console.log('error:', err);
      res.send("0");
    } else {
      console.log('got token, sending token...')
      res.send(token);
    }
  });
  
});


/////////////////////////////////// ROUTES ///////////////////////////////////

//so when rendering jade files only need to write file name, not path
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

//so when trying to access css or js,  dont need to write path
app.use(express.static(__dirname + '/public')) // load UI from public folder

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

/////////////////////////////////// translating part ///////////////////////////////////





/////////////////////////////////// make this file an importable module ///////////////////////////////////
module.exports = app;

