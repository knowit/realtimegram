var querystring = require('querystring');

var filed = require('filed');
var express = require('express');
var formidable = require('formidable');
var seaport = require('seaport');
var socketio = require('socket.io-client');
var request = require('request');
var shoe = require('shoe');

var ports = seaport.connect('localhost', 5001);

var app = express();

var pusherStream;

app.post('/', function(req, res) {
	res.setHeader('content-length', 0);

	// Set up a parser to parse the binary multipart form data.
	var form = new formidable.IncomingForm();

	// Prepare to handle the form data.
	form.onPart = function(part) {
		// Make a new file with the same filename as the user's.
		var filename = part.filename;
		var newFile = filed('public/'+ filename);

		// Stream file to disk as it is being sent and parsed.
		part.pipe(newFile);
			
		// When the file is written respond with a "201 Created".
		// And tell the pusher a new file has been uploaded.
		newFile.on('end', function() {
			res.statusCode = 201;
			res.end();

			console.log('File written');

			updatePusher(filename);
		});
	};

	// Start parsing the form data.
	form.parse(req);
});

var updatePusher = function(filename) {
	ports.get('privPusher@1.0.0', function(ps) {
		// Open a Socket.IO connection to the pusher
		var uri = 'http://' + ps[0].host + ':' + ps[0].port;

		request.post({uri: uri, json: {filename: filename}});
	});
};

// Register a service with Seaport.
ports.service('downloader@1.0.0', function(port, ready) {
	app.listen(port, ready);
});