var express = require('express'); //package for make node as web server
var app = express(); //instance for express package
var ejs = require('ejs'); //package for view engine
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

app.set('view engine', 'ejs'); // set the view engine to ejs

// page render
app.get('/', function(req, res) {
  res.render('pages/index');
});

// API


app.listen(8080);
console.log("Server listening at Port 8080");
