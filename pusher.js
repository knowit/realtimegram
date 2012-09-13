var http = require('http');

var express = require('express');
var seaport = require('seaport');
var socketio = require('socket.io');
var shoe = require('shoe');

var ports = seaport.connect('localhost', 5001);

var server = http.createServer();
var io = socketio.listen(server);

var privApp = express();
privApp.use(express.bodyParser());

privApp.post('/', function(req, res) {
	console.log(req.body);
	var filename = req.body.filename;
	io.sockets.emit('img', filename);

	res.end();
});

var privServer = http.createServer(privApp);

ports.service('pusher@1.0.0', function(port, ready) {
	server.listen(port, ready);
});

ports.service('privPusher@1.0.0', function(port, ready) {
	privServer.listen(port, ready);
});