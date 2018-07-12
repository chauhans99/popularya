
var express = require('express');  //require is node function to import modules
var app = express();  //instance of express

var router = express.Router();
var path = __dirname + '/views/';
var MongoClient = require('mongodb');  //mongodb
var bodyParser = require('body-parser');  //body-parser middleware

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/img",function(req,res){
  res.sendFile(path + "img/");
});

router.get("/css",function(req,res){
  res.sendFile(path + "css");
});

router.get("/lib",function(req,res){
  res.sendFile(path + "lib");
});


app.use(express.static('public'));


app.use("/",router);

var db

//connect to mongodb.  Remmember to replace the connection string below with your own string
MongoClient.connect('mongodb://chauhan:testing1@ds131551.mlab.com:31551/popularya', (err, database) => {
	if(err) return console.log(err)  //if error return error
		db=database.db('popularya')

  db.collection('Reviews').find().toArray(function(err, results) {
    console.log(results);

    app.post('/ajaxTarget', function (req, res) {
      res.json(results);
    });
  })

	app.listen(3000, function(){  // otherwise start server on port 3000
		console.log('listening on port 3000')
	})

})





//
// app.use("/",router);
//
//
//     //get data from database and return data like
//
//
// MongoClient.connect('mongodb://chauhan:testing1@ds131551.mlab.com:31551/popularya', (err, client) => {
// if (err) return console.log(err)
// db = client.db('popularya') // whatever your database name is
// var reviews = db.collection("Reviews").find()
// console.log(reviews)
// app.post('/ajaxTarget', function (req, res) {
// console.log("hello")
// res.json(reviews);
// });
// app.listen(3000, () => {
// console.log('listening on 3000')
// })
// })
