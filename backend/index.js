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
const path = __dirname + "/build/";
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
    db.query("SELECT DISTINCT State_Id, State_Name FROM city" , function(err , result , data){
        if(err){
            throw err ;
        }else{
            res.send(result)
        }
    })
})
app.get('/getCity/:id/' , function (req , res) {
    db.query("SELECT Id , City_Name FROM city WHERE city.State_Id=?" , [req.params.id] , function (err , result , data) {
        if(err){
            throw err ;
        }else{
            res.send(result);
        }
    } );
    console.log("Get city called");
})

app.get('/getHotels/:id/:rating' , function (req , res){
    if(req.params.rating === '1'){
        db.query("SELECT * FROM hotel WHERE hotel.City_Id = ?" , [req.params.id] , function(err , result , data){
            if(err){
                throw err;
            }
            else{
                res.send(result);
            }
        })
    }else{
        db.query("SELECT * FROM hotel WHERE hotel.City_Id = ? AND hotel.Rating = ?" , [req.params.id , req.params.rating] , function(err , result , data){
            if(err){
                throw err;
            }
            else{
                res.send(result);
            }
        })
    }
    console.log("Get Hotel called");
})

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening at port ${port}!`);
});
