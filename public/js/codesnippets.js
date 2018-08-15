
////////////////////////// websocket code //////////////////////////
// var token = process.env.WS_TOKEN;
// var wsURI = 'wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize'
//   + '?watson-token=' + token
//   + '&model=en-EN_BroadbandModel';
// var websocket = new WebSocket(wsURI);
// websocket.onopen = function(evt) { onOpen(evt) };
// websocket.onclose = function(evt) { onClose(evt) };
// websocket.onmessage = function(evt) { onMessage(evt) };
// websocket.onerror = function(evt) { onError(evt) };

// function onOpen(evt) {
//   var message = {
//   'action': 'start',
//   'objectMode': true,
//   'content-type': 'audio/l16;rate=22050',
//   'word_confidence': true,
//   'interim_results': true,
//   'Transfer-Encoding': 'chunked'
//   };
//   websocket.send(JSON.stringify(message));
// }

// function onMessage(evt) {
//   console.log(evt.data);
// }

// function onError(evt) {
//   console.log(evt.error);
// }

// function onClose(evt) {
//   console.log('closing websocket');
//   websocket.close();
// }



//////////////////////// translate test ////////////////////////

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

//////////////////////// stt test ////////////////////////

// var params = {
//   content_type: 'audio/wav',
//   objectMode: true
// };
// // create the stream
// var recognizeStream = stt.createRecognizeStream(params);
// // pipe in some audio
// fs.createReadStream(__dirname + '/speech.wav').pipe(recognizeStream);
// recognizeStream.on('data', function(event) { onEvent('Data:', event); });
// recognizeStream.on('error', function(event) { onEvent('Error:', event); });
// recognizeStream.on('close', function(event) { onEvent('Close:', event); });
// // Displays events on the console.
// function onEvent(name, event) {
//   console.log(name, JSON.stringify(event, null, 2));
// };

// var params = {
//     objectMode: true,
//     'content_type': 'audio/flac',
//     model: 'en-US_BroadbandModel',
//     interim_results: true
// };
// var stream = stt.createRecognizeStream(params);
// fs.createReadStream('audio-file.flac').pipe(stream);
// // Listen for events.
// stream.on('data', function(event) { onEvent('Data:', event); });
// stream.on('error', function(event) { onEvent('Error:', event); });
// stream.on('close', function(event) { onEvent('Close:', event); });

// // Display events on the console.
// function onEvent(name, event) {
//     console.log(name, JSON.stringify(event, null, 2));
// };


//////////////////////// lt creds ////////////////////////
// var lt = new LanguageTranslatorV3({
//     "version": process.env.LT_VERSION,
//     "iam_apikey": process.env.LT_IAM_APIKEY,
//     "iam_apikey_description": process.env.LT_IAM_APIKEY_DESCRIPTION,
//     "iam_apikey_name": process.env.LT_IAM_APIKEY_NAME,
//     "iam_role_crn": process.env.LT_IAM_ROLE_CRN,
//     "iam_serviceid_crn": process.env.LT_IAM_SERVICEID_CRN,
//     "url": process.env.LT_URL
// });