
// idk what this does
// uses the stt.js file to get token?

var express = require('express');
var router = express.Router();
var speech_to_text = require('./speech_to_text');

module.exports = router;
// speech-to-text
router.get('/api/speech-to-text/token*',speech_to_text.token);