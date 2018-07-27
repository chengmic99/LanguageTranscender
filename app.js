'use strict';

require('dotenv').config({
	silent:true
});


/////////////////////////////////// IMPORT MODULES ///////////////////////////////////
var express = require('express'); //app server
var fs = require('fs'); //file system for loading json
var bodyParser = require('body-parser'); //parser for post requests

var speechToText = require('watson-developer-cloud/speech-to-text/v1'); //watson sdks
var languageTranslator = require('watson-developer-cloud/language-translator/v3'); 


/////////////////////////////////// CONSTRUCTORS/AUTHs ///////////////////////////////////
var app = express()
var stt = new speechToText({
  	"url": "https://stream.watsonplatform.net/speech-to-text/api",
  	"username": "16313d89-848b-4573-b1d4-0e67fd3e9d24",
  	"password": "5r5Nuc2oabXM"
})
var lt = new languageTranslator({
    "version": "2018-05-01",
    "iam_apikey": "lhcl8hF6QNEZN5TuExScVkd8JWibQtbfewVS5NJFrmI9",
  	"iam_apikey_description": "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:language-translator:us-south:a/cfe3814ad3ab55162bfbbe87e81724b5:4ff6c37f-3a64-40f6-99a3-12cbf09450eb::",
  	"iam_apikey_name": "auto-generated-apikey-26977876-4506-40e5-a275-0ae8022554ce",
  	"iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
  	"iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/cfe3814ad3ab55162bfbbe87e81724b5::serviceid:ServiceId-8cf952a4-4a07-44e4-b6d3-ce34a76a256f",
  	"url": "https://gateway.watsonplatform.net/language-translator/api"
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

//////// tests

// lt.translate(
//   {
//     text: 'A sentence must have a verb',
//     source: 'en',
//     target: 'es'
//   },
//   function(err, translation) {
//     if (err) {
//       console.log('error:', err);
//     } else {
//       console.log(JSON.stringify(translation, null, 2));
//     }
//   }
// );





// /*
//     This code will print the entire response to the console when it
//     receives the 'data' event. Some applications will want to write
//     out only the transcribed text, to the console or to a file.
//     To do this, remove `objectMode: true` from the `params` object.
//     Then, uncomment the block of code.
// */

// var params = {
//   content_type: 'audio/wav',
//   objectMode: true
// };

// // create the stream
// var recognizeStream = stt.createRecognizeStream(params);

// // pipe in some audio
// fs.createReadStream(__dirname + '/speech.wav').pipe(recognizeStream);


// // these two lines of code will only work if `objectMode` is `false`
// // pipe out the transcription to a file
// recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
// // get strings instead of Buffers from `data` events
// recognizeStream.setEncoding('utf8');


// recognizeStream.on('data', function(event) { onEvent('Data:', event); });
// recognizeStream.on('error', function(event) { onEvent('Error:', event); });
// recognizeStream.on('close', function(event) { onEvent('Close:', event); });

// // Displays events on the console.
// function onEvent(name, event) {
//   console.log(name, JSON.stringify(event, null, 2));
// };



/////////////////////////////////// make this file an importable module ///////////////////////////////////
module.exports = app;



