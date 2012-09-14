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

var getImages = function(dir, amount, callback) {
	fs.readdir(dir, function(err, filenames) {
		if(err) callback(err, null);
		// Get absolute paths
		var paths = filenames.map(function(filename) {
			return dir + filename;
		});

		// Get stat for all files
		async.map(paths, fs.stat, function(err, stats) {
			// Merge filename into stat object
			var images = stats.map(function(stat, i) {
				stat.filename = filenames[i];
				return stat;
			});

			// Sort images by create date
			images.sort(function(image) {
				return -image.ctime;
			});

			callback(err, images.slice(0, amount));
		});
	});
};

app.get('/', function(req, res) {
	async.parallel({
		images: async.apply(getImages, IMG_DIR, 10),
		template: async.apply(fs.readFile, PUBLIC_DIR + '/index.html', 'utf8')
	},
	function(err, results) {
		var imgs = results.images.map(function(image) {
			return {
				href: image.filename,
				date: image.ctime
			};
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