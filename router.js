var bouncy = require('bouncy');
var seaport = require('seaport');

var ports = seaport.createServer().listen(5001);

bouncy(function (req, bounce) {
    // What service do we need to handle the request?
    var service = 'static'; // default to static
    if(req.url.match(/^\/socket.io\/1/)) {
        service = 'pusher';
    } else if(req.method.toLowerCase() === 'post') {
        service = 'downloader';
    }

    var domains = (req.headers.host || '').split('.');
    var versions = {
        unstable : '1.1.x',
        stable : '1.0.x'
    };
    var selectedVersion = versions[domains[0]];
    var fullService = service + '@' + (selectedVersion || '1.0.x');
    
    var ps = ports.query(fullService);
    
    if (ps.length === 0) {
        var res = bounce.respond();
        res.end('service not available\n');
    }
    else {
        bounce(ps[0].host, ps[0].port);
    }
}).listen(5000);