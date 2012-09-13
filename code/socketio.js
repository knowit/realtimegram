var io = require('socket.io');
var express = require('express');

var app = express(),
    server = require('http').createServer(app),
    io = io.listen(server);

server.listen(80);

io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});
