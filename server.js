'use strict'

const server = require('./app');
const port = process.env.PORT || process.env.VCAP_APP_PORT || 4000;

server.listen(port, function() {
	console.log("Server running on port %d", port);
});