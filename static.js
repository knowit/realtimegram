var http = require('http');

var io = require('socket.io');
var filed = require('filed');
var express = require('express');
var seaport = require('seaport');

var PUBLIC_DIR = __dirname + '/public/';

var ports = seaport.connect('localhost', 5001);
var app = express();

app.get('*', function(req, res) {
	filed(PUBLIC_DIR + req.url).pipe(res);
});

var server = http.createServer(app);
var io = io.listen(server);

ports.service('static@1.0.0', function(port, ready) {
	server.listen(port, ready);
});