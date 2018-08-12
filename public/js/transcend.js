
var recognizeMicrophone = require('watson-speech/speech-to-text/recognize-microphone');
// var WebSocket = require('ws')


global.speechToText = function() {
	console.log("fetching stt token")

	fetch('/api/speech-to-text/token')
	//.then(function(response) {
	//return response.text();
	//})
	.then(function (token) {
		//console.log("received token")

		var stream = recognizeMicrophone({
		token: token,
		//objectMode: true, // send objects instead of text
		extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
		format: false // performs basic formatting on the results such as capitals an periods
		});

		stream.setEncoding('utf8'); // get text instead of Buffers for on data events

		stream.on('data', function(data) {
		console.log(data);
		});

		stream.on('error', function(err) {
		console.log(err);
		});

		$("#btn-stop").click( function() {
		console.log("stopping");
		stream.stop.bind(stream);
		});

	}).catch(function(error) {
		console.log(error);
	});

}