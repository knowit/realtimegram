var http = require('http');

var seaport = require('seaport');
var socketio = require('socket.io');

var ports = seaport.connect('localhost', 5001);

var server = http.createServer();
var io = socketio.listen(server);

var privServer = http.createServer();
var privIo = socketio.listen(privServer);

ports.on('error', function(error) {
	console.log('AFHAWOGFHESOGJWESG')
});

privIo.sockets.on('connection', function(privSocket) {
	privSocket.on('upload', function(filename) {
		io.sockets.emit('img', filename);
	});
});

ports.service('pusher@1.0.0', function(port, ready) {
	server.listen(port, ready);
});

ports.service('privPusher@1.0.0', function(port, ready) {
	privServer.listen(port, ready);
});