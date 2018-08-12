var AuthorizationV1 = require('watson-developer-cloud/authorization/v1');
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1'); //watson sdks
var browserify = require('browserify');

var recognizeMicrophone = require('watson-speech/speech-to-text/recognize-microphone');
fetch('/api/speech-to-text/token')
   .then(function(response) {
     return response.text();
   })
   .then(function(token) {
     var stream = recognizeMicrophone({
       token: token,
       outputElement: '#output' // CSS selector or DOM Element
     });

     stream.on('error', function(err) {
       console.log(err);
     });
   })
   .catch(function(error) {
     console.log(error);
   });