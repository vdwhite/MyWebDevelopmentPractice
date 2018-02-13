//initialize app
var express = require("express");
var app = express();

app.get("/", function(req,res){
   res.send("Hi there, welcome to my assignment!"); 
});

//different routes
app.get("/speak/:animals",function(req,res){
        var sound = {
            pig: " \'Oink\'",
            cow: " \'Moo\'", 
            dog: " \'Woof WOof!\'"
        }
        if(typeof(sound[req.params.animals.toLowerCase()])==="undefined"){
            throw("Sorry, page not found... what are you doing with your life?");
        }
        res.send("The "+req.params.animals.toLowerCase()+" says"+sound[req.params.animals.toLowerCase()]);
})

app.get("/repeat/:string/:times", function(req,res){
   var str = "";
   for(var i=0;i<req.params.times; i++){
       str += req.params.string+" ";
   } 
   res.send(str);
});

app.get("*",function(req,res){
   throw("Sorry, page not found... what are you doing with your life?"); 
});

//listen for express
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!");
})

