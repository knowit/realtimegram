var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var querystring = require('querystring');

var filed = require('filed');
var express = require('express');
var formidable = require('formidable');
var seaport = require('seaport');
var request = require('request');

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
		var fileExt = path.extname(part.filename);
		var filePath = __dirname + '/uploads/' + filename;
		var newFile = filed(filePath);

		// Stream file to disk as it is being sent and parsed.
		part.pipe(newFile);

		// Compute a hash of the streaming file for naming.
		var shasum = crypto.createHash('sha1');
		part.on('data', function(data) {
			shasum.update(data);
		});
			
		// When the file is written
		newFile.on('end', function() {
			// Rename image to hashed name to avoid name collisions
			// and duplicates.
			var newName = shasum.digest('hex') + fileExt;
			var newPath = path.join(__dirname, '/uploads/', newName);
			fs.rename(filePath, newPath, function(err) {
				// Respond with a "201 Created"
				res.statusCode = 201;
				res.end();

				// Update pusher about new upload
				updatePusher(newName);
			});
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