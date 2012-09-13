var path = require('path');

var forever = require('forever-monitor');

['router', 'pusher', 'static', 'downloader'].forEach(function(name) {
	var file = name + '.js';
	var filePath = path.join(__dirname, file);
	var child = new (forever.Monitor)(filePath, {
		silent: process.env.NODE_ENV == 'production'
	});

	child.start();

	child.on('restart', function() {
		console.log(file + ' been restarted');
	});

	child.on('exit', function () {
		console.log(file + ' has exited after 3 restarts');
	});
});