var http = require('http');

var filed = require('filed');
var express = require('express');
var formidable = require('formidable');

var app = express();

app.get('/', function(req, res) {
	res.send(
		'<form action="/upload" enctype="multipart/form-data" method="post">'+
		'<input type="text" name="title"><br>'+
		'<input type="file" name="image"><br>'+
		'<input type="submit" value="Upload">'+
		'</form>'
	);
});

app.post('/', function(req, res) {
	res.statusCode = 201;
	res.setHeader('content-length', 0);

	var form = new formidable.IncomingForm();

	form.onPart = function(part) {
		var file = filed('uploaf.jpg');
		part.pipe(file);
		
		file.on('end', function() {
			res.end();
		});
	};

	form.parse(req);
});

app.listen(3000);