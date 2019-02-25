var express = require("express");
var mysql = require("mysql");

var app = express();

app.use(express.urlencoded());
app.use(express.static('public'));

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "viirtue_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

app.get('/', function(req,res){
  res.sendFile(__dirname + "/public" + "/test.html");
});


app.post('/serialForm', function (req,res){
  console.log("Inside form");
  console.log('req.body: ' + req.body.snumb); 

  
   connection.query('SELECT * FROM authMerch WHERE snumb = ?', req.body.snumb, function(selErr,selRes){
     if(selErr) throw selErr;

     console.log("response length: " + selRes.length );
    
     if(selRes.length > 0){
      console.log('it exists');
      console.log("res after query: " + selRes);
      console.log("Confirmation Number: " + selRes[0].confNumb + "\nAddress: " + selRes[0].retAddress); 
      res.send(selRes);
    }
    else 
    {
      console.log('does not exist');
      connection.query('INSERT INTO authMerch SET ?', {
        snumb: req.body.snumb,
        }, function (insErr,insRes){
            console.log("Inserted!");
            console.log("Insert Response: " + JSON.stringify(insRes));
            connection.query('SELECT * FROM authMerch WHERE confNumb = ?', insRes.insertId, function(confErr,confRes){
              if(confErr) throw confErr;
              res.send(confRes);
              });
            }
        );
    }
    });
  });

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});