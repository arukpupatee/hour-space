var express = require('express'); //package for make node as web server
var app = express(); //instance for express package
var ejs = require('ejs'); //package for view engine
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');

app.set('view engine', 'ejs'); // set the view engine to ejs
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

// page render
app.get('/', function(req, res) {
  var res_obj = {};
  get_all_categories(function(categories){
    res_obj.categories = categories;
    get_all_locations(function(locations){
      res_obj.locations = locations;
      res.render('pages/index',res_obj);
    });
  });
});
app.post('/result', function(req, res) {
  var res_obj = {};
  get_all_categories(function(categories){
    res_obj.categories = categories;
    get_all_locations(function(locations){
      res_obj.locations = locations;
      var condition = {};
      condition.location= req.body.location;
      var temp_date = req.body.date;
      temp_date = temp_date.split("/");
      condition.date= temp_date[2]+"-"+temp_date[0]+"-"+temp_date[1];
      condition.purpose= req.body.purpose;
      condition.people= req.body.people;
      get_space_by_condition(condition,function(spaces){
        res_obj.spaces = spaces;
        res.render('pages/result',res_obj);
      });
    });
  });
});
app.get('/result',function(req, res) {
  var res_obj = {};
  get_all_categories(function(categories){
    res_obj.categories = categories;
    get_all_locations(function(locations){
      res_obj.locations = locations;
      var condition = {};
      condition.purpose= req.query.p;
      get_space_by_condition(condition,function(spaces){
        res_obj.spaces = spaces;
        res.render('pages/result',res_obj);
        console.log(res_obj);
      });
    });
  });
});
app.get('/space', function(req, res) {
  var space_id = req.query.id;
  var res_obj = {};
  get_space_by_id(space_id,function (space){
    console.log(space);
  });
  res.render('pages/space',res_obj);
});

// function
function get_all_categories(callback){
  db.all("SELECT * FROM space_categories", function(err, rows) {
    if (err) throw err;
    callback(rows);
  });
}
function get_all_locations(callback){
  db.all("SELECT DISTINCT location_name FROM spaces", function(err,rows){
    if (err) throw err;
    callback(rows);
  });
}
function get_space_by_id(id,callback){
  var query_text = "SELECT spaces.name,spaces.location,spaces.rating,spaces.people,space_categories.name as category ";
  //query_text += "space_amenities.name as am_name,space_amenities.icon_image_path as am_icon ";
  query_text += "space_addons.name as ad_name,space_addons.icon_image_path as ad_icon,space_addons.price as ad_price ";
  query_text += "owners.name as o_name,owners.email as o_email,owners.phone_number as o_phone ";
  query_text += "space_photo.photo_name FROM spaces ";
  query_text += "INNER JOIN space_categories ON spaces.category_id=space_categories.id "
  query_text += "INNER JOIN owners ON spaces.owner_id = owners.id ";
  query_text += "INNER JOIN space_amenities ON space_categories.id = space_amenities.categories_id ";
  query_text += "INNER JOIN space_addons ON space_categories.id = space_addons.categories_id ";
  query_text += "INNER JOIN space_photo ON spaces.id = space_photo.space_id ";
  query_text += "WHERE spaces.id="+id;
  db.all(query_text, function(err, rows) {
    if (err) throw err;
    callback(rows);
  });
}
function get_space_by_condition(condition,callback){
  var query_text = "";
  if(typeof condition.location == "undefined"){
    var purpose = condition.purpose;
    query_text += "SELECT spaces.id,spaces.name,spaces.price,spaces.location_name,spaces.people,spaces.rating, space_categories.name as category FROM spaces ";
    query_text += "INNER JOIN space_categories ON spaces.category_id = space_categories.id ";
    query_text += "WHERE space_categories.name='"+purpose+"'";
  }
  else{
    var location = condition.location;
    var date = condition.date;
    var purpose = condition.purpose;
    var people = condition.people;
    query_text += "SELECT DISTINCT spaces.id,spaces.name,spaces.price,spaces.location_name,spaces.people,spaces.rating, space_categories.name as category FROM spaces ";
    query_text += "INNER JOIN space_available_slots ON spaces.id=space_available_slots.space_id ";
    query_text += "INNER JOIN space_categories ON spaces.category_id = space_categories.id ";
    query_text += "WHERE spaces.location_name='"+location+"' AND ";
    query_text += "spaces.people >= "+people+" AND ";
    query_text += "space_available_slots.date='"+date+"' AND ";
    query_text += "space_categories.name='"+purpose+"'";

  }
  db.all(query_text, function(err, rows) {
    if (err) throw err;
    callback(rows);
  });
}


app.listen(8080);
console.log("Server listening at Port 8080");
