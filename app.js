var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

var app = express();
var server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


var db = new sqlite3.Database('./database/enquiries.db');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(helmet());
app.use(limiter);

db.run('CREATE TABLE IF NOT EXISTS enq(id TEXT, name TEXT)');

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/form.html'));
  });

  app.post('/addEnquiry', function(req,res){
    db.serialize(()=>{
      db.run('INSERT INTO enq(id,name) VALUES(?,?)', [req.body.id, req.body.name], function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("New enquiry has been added");
        res.send("New enquiry has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);
      });
    });
  });
  server.listen(3000,function(){ 
    console.log("Server listening on port: 3000")});