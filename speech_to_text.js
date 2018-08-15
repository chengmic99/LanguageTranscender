
// sends the stt token

var extend = require('extend');
var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');
var config = require('./env.json');
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');


exports.token = function(req, res) {
	// the extend function adds additional information into our credentials from within the 
    // Watson and Bluemix operating environment
	var stt = extend(config.speech_to_text, vcapServices.getCredentials('speech_to_text'));
    // var stt = new SpeechToTextV1 ({
    // 	"version":'v1',
    // 	"url":"https://stream.watsonplatform.net/speech-to-text/api",
    // 	"username":"16313d89-848b-4573-b1d4-0e67fd3e9d24",
    // 	"password":"5r5Nuc2oabXM"
    // )};

	// request authorization to access the service
    var sttAuthService = watson.authorization(stt);

    // now that we're authenticated, get the token
    sttAuthService.getToken({
        url: "https://stream.watsonplatform.net/speech-to-text/api"
    }, function(err, token) {
        if (err) {
            // send an error back if we cannot retrieve the token successfully
            console.log('Error retrieving token: ', err);
            res.status(500).send('Error retrieving token'+ReferenceError);
            return;
        }
        // if we're successful, then send the new token back to the browser
        res.send(token);
    });
}