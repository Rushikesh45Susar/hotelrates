var express=require("express"); 
const dotenv = require('dotenv');
dotenv.config();
var bodyParser=require("body-parser"); 
var app = express();
var http = require('http');
var db = require('./config.js');
app.use(bodyParser.json());
  
app.set('view engine','html'); 
app.set('view engine','ejs');
const path = __dirname + "/root/";
app.use(express.static(path));

// app.get("/", function (req, res) {
//     res.sendFile(path + "index.html");
// });

// app.get('*', (req,res) =>{
//     res.sendFile(path + "index.html");
// })
app.use(bodyParser.urlencoded({ 
    extended: true
})); 

app.get('/getstate/' , function(req , res) {
    db.query("SELECT DISTINCT state_id, state_name FROM city" , function(err , result , data){
        if(err){
            throw err ;
        }else{
            res.send(result)
        }
    })
})
app.get('/getCity/:id/' , function (req , res) {
   
    const query = {
        // give the query a unique name
        name: 'fetch-city',
        text: 'SELECT id , city_name FROM city WHERE city.state_id= $1',
        values: [req.params.id],
      }
       
      // callback
      db.query(query, (err, result) => {
        if (err) {
          console.log(err.stack)
        } else {
          res.send(result)
        }
      })
})

app.get('/getHotels/:id/:rating' , function (req , res){
    if(req.params.rating === '1'){
        const query = {
            name: 'fetch-hotel-with-all',
            text: 'SELECT * FROM hotel WHERE hotel.city_id = $1',
            values: [req.params.id],
        }
        db.query(query, (err, result) => {
            if (err) {
              console.log(err.stack)
            } else {
              res.send(result)
            }
        })
    }else{
        const query = {
            name: 'fetch-hotel-with-rating',
            text: 'SELECT * FROM hotel WHERE hotel.city_id = $1 AND hotel.rating = $2',
            values: [req.params.id , req.params.rating],
          }
           
          // callback
          db.query(query, (err, result) => {
            if (err) {
              console.log(err.stack)
            } else {
              res.send(result)
            }
          })
    }
    console.log("Get Hotel called");
})

var port = process.env.PORT || 8080;

app.get("/", function (req, res) {
    res.sendFile(path + "index.html");
});

app.listen(port, () => {
    console.log(`Listening at port ${port}!`);
});


module.exports = app ;