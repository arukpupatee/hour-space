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
      condition.date= req.body.date;
      condition.purpose= req.body.purpose;
      condition.people= req.body.people;
      get_space_by_condition(condition,function(spaces){
        function next1(){
          console.log(res_obj);
          res.render('pages/result',res_obj);
        }
        Object.keys(spaces).forEach(function(index){
          var arr = []
          get_categories_by_space_id(spaces[index].id,function(space_categories){
            Object.keys(space_categories).forEach(function(index2){
              arr[arr.length] = space_categories[index2].name;
              spaces[index].category = arr;
            });
          }).function();
            res_obj.spaces = spaces;
          
        }).next1();
        /*
        for (var i = 0; i < spaces.length; i++) {
          var arr = []
          get_categories_by_space_id(spaces[i].id,function(space_categories){
            for (var j = 0; j < space_categories.length; j++) {
              arr[arr.length] = space_categories[j].name;
              console.log(spaces);
              console.log(i);
              console.log(spaces[i]);
              console.log(spaces[i].category);
              spaces[i].category = arr;
              if( !(i<spaces.length) && !(j,space_categories.length) ){
                res_obj.spaces = spaces;
                console.log(res_obj);
                res.render('pages/result',res_obj);
              }
            }
          });
        }
        */
      });
    });
  });
});
app.get('/result/:purpose',function(req, res) {
  var res_obj = {};
  get_all_categories(function(categories){
    res_obj.categories = categories;
    get_all_locations(function(locations){
      res_obj.locations = locations;
      var condition = {};
      condition.purpose= req.params.purpose;
      get_space_by_condition(condition,function(spaces){
        for (var i = 0; i < spaces.length; i++) {
          var arr = []
          get_categories_by_space_id(spaces[i].id,function(space_categories){
            for (var j = 0; j < space_categories.length; j++) {
              arr[arr.length] = space_categories[j].name;
            }
          });
          spaces[i].category = arr;
        }
        res_obj.spaces = spaces;
        res.render('pages/result',res_obj);
      });
    });
  });
});
/*
app.get('/register', function(req,res) {
  res.render('pages/register');
});
app.get('/login', function(req,res) {
  res.render('pages/login');
});
*/

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
function get_all_spaces(callback){
  db.all("SELECT * FROM spaces", function(err, rows) {
    if (err) throw err;
    callback(rows);
  });
}
function get_space_by_id(id,callback){
  db.all("SELECT * FROM spaces WHERE id="+id, function(err, rows) {
    if (err) throw err;
    callback(rows);
  });
}
function get_space_by_condition(condition,callback){
  var query_text = "";
  if(typeof condition.location == "undefined"){
    var purpose = condition.purpose;
    query_text += "SELECT * FROM spaces ";
    query_text += "INNER JOIN space_has_categories ON spaces.id = space_has_categories.space_id ";
    query_text += "INNER JOIN space_categories ON space_has_categories.category_id = space_categories.id ";
    query_text += "WHERE space_categories.name='"+purpose+"'";
  }
  else{
    var location = condition.location;
    var date = condition.date;
    var purpose = condition.purpose;
    var people = condition.people;
    query_text += "SELECT DISTINCT spaces.id,spaces.name,spaces.price,spaces.location_name,spaces.people,spaces.rating, space_categories.name as category FROM spaces ";
    query_text += "INNER JOIN space_available_slots ON spaces.id=space_available_slots.space_id ";
    query_text += "INNER JOIN space_has_categories ON spaces.id=space_has_categories.space_id ";
    query_text += "INNER JOIN space_categories ON space_has_categories.category_id=space_categories.id ";
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
function get_categories_by_space_id(space_id,callback){
  var query_text = "";
  query_text += "SELECT DISTINCT space_categories.name FROM spaces ";
  query_text += "INNER JOIN space_has_categories ON spaces.id=space_has_categories.space_id ";
  query_text += "INNER JOIN space_categories ON space_has_categories.category_id=space_categories.id ";
  query_text += "WHERE spaces.id="+space_id;
  db.all(query_text, function(err, rows) {
    if (err) throw err;
    callback(rows);
  });
}

// for passport authentication
/*
app.post('/register', function(req,res) {
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var name = req.body.name;
  var email = req.body.email;
  var phone_number = req.body.phone_number;
  */

  //Validation
  /*
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('name', 'Full Name is required').notEmpty();
  req.checkBody('phone_number', 'Phone Number is required').notEmpty();
  var errors = req.validationErrors();
  if (errors){
    res.render('register', {
        errors:errors
    });
  } else {
    generate(10, function(uniqueId){
      var stmt = db.prepare("INSERT INTO customers ( id,name,email,phone_number,username,password,salt ) VALUES (?,?,?,?,?,?,?)");
      stmt.run([ uniqueId,name,email,phone_number,username,password,'hours-space' ]).finalize();
      res.redirect('/');
      console.log("success register");
    });
  }
  */
  /*
  db.get('SELECT id FROM customers ORDER BY id DESC LIMIT 1', function(err, rows) {
    var id;
    if(!rows){
      id = 0;
    }
    else if(rows.isArray){
      id = rows[0].id + 1;
    }
    else{
      id = rows.id + 1;
    }
    var stmt = db.prepare("INSERT INTO customers ( id,name,email,phone_number,username,password,salt ) VALUES (?,?,?,?,?,?,?)");
    stmt.run([ id,name,email,phone_number.toString(),username,hashPassword(password,'hoursspace'),'hoursspace' ]).finalize();
    res.redirect('/');
  });
});
function hashPassword(password, salt) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}
passport.use(new LocalStrategy(function(username, password, done) {
  db.get('SELECT salt FROM customers WHERE username = ?', username, function(err, row) {
    if (!row) return done(null, false);
    var hash = hashPassword(password, row.salt);
    db.get('SELECT username, id FROM customers WHERE username = ? AND password = ?', username, hash, function(err, row) {
      if (!row) return done(null, false);
      return done(null, row);
    });
  });
}));
passport.serializeUser(function(customers, done) {
  return done(null, customers.id);
});
passport.deserializeUser(function(id, done) {
  db.get('SELECT id, username FROM customers WHERE id = ?', id, function(err, row) {
    if (!row) return done(null, false);
    return done(null, row);
  });
});
app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));
  */

app.listen(8080);
console.log("Server listening at Port 8080");
