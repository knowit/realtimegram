var spawn = require('child_process').spawn;

['router', 'pusher', 'static', 'downloader'].forEach(function(file) {
	var ps = spawn('node', [__dirname + '/' + file + '.js']);
	ps.stdout.pipe(process.stdout);
	ps.stderr.pipe(process.stdout);
});