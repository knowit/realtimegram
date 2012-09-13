var fs = require('fs');
var http = require('http');
var path = require('path');

var io = require('socket.io');
var async = require('async');
var filed = require('filed');
var express = require('express');
var seaport = require('seaport');
var mustache = require('mustache');

var PUBLIC_DIR = __dirname + '/public/';
var IMG_DIR = __dirname + '/uploads/';

var ports = seaport.connect('localhost', 5001);
var app = express();

app.get('/', function(req, res) {
	async.parallel({
		files: async.apply(fs.readdir, IMG_DIR),
		template: async.apply(fs.readFile, PUBLIC_DIR + '/index.html', 'utf8')
	},
	function(err, results) {
		var imgs = results.files.map(function(img) {
			return {href: img};
		});

		var data = {imgs: JSON.stringify(imgs)};
		var html = mustache.render(results.template, data);

		res.end(html);
	});
});

app.get('/images/:filename', function(req, res) {
	var filename = req.params.filename;
	filed(IMG_DIR + filename).pipe(res);
});

app.get('*', function(req, res) {
	filed(PUBLIC_DIR + req.url).pipe(res);
});

var server = http.createServer(app);
var io = io.listen(server);

ports.service('static@1.0.0', function(port, ready) {
	server.listen(port, ready);
});