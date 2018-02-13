var express = require("express");
var app = express();

//routes
// "/" gets message hi

app.get("/", function(req, res){
    res.send("Hi there!");
})

//"/bye" gets msg goodbye
app.get("/bye", function(req,res){
    res.send("BYE");
})

// "/dog" gets msg meow
app.get("/dog", function(req,res){
    res.send("MEOW!");
})

// route parameter, follow pattern after :
app.get("/r/:subreddit",function(req,res){
    res.send("Welcom to the " + req.params.subreddit+" subreddit!");
})

// route parameter, follow pattern after :
app.get("/r/:subreddit/comments/:id/:title",function(req,res){
    res.send("Comments of "+req.params.title);
})


app.get("*",function(req,res){
    res.send("You are a star!");
})

//listen for express
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started!");
});