var express = require('express'); //package for make node as web server
var app = express(); //instance for express package
var ejs = require('ejs'); //package for view engine

app.set('view engine', 'ejs'); // set the view engine to ejs

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.listen(8080);
console.log("Server listening at Port 8080");
