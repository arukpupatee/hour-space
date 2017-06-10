var express = require('express'); //package for make node as web server
var app = express(); //instance for express package
var ejs = require('ejs'); //package for view engine
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

app.set('view engine', 'ejs'); // set the view engine to ejs

// page render
app.get('/', function(req, res) {
  var res_obj = {};
  get_categories(function(categories){
    res_obj.categories = categories;
    res.render('pages/index');
  });
});

// function
function get_categories(callback){
  db.all("SELECT * FROM space_categories", function(err, rows) {
    callback(rows);
  });
}
function get_all_spaces(callback){
  db.all("SELECT * FROM spaces", function(err, rows) {
    callback(rows);
  });
}
function get_space(id,callback){
  db.all("SELECT * FROM spaces WHERE id="+id, function(err, rows) {
    callback(rows);
  });
}

app.listen(8080);
console.log("Server listening at Port 8080");
