var express = require('express');
var app = express();

app.set('view engine', 'jade');

var people = [
	{ name: 'John Doe' },
	{ name: 'Jane Doe' }
};

app.get('/', function(req, res){
	res.render('index', { people: people });
});

app.listen(3000);
console.log('Listening on port 3000');
