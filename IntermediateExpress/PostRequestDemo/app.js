var express = require("express");
var app = express();
var bodyparser = require("body-parser");

// will be ereased every time restart the server
var friends = ["tony","ryu", "ken", "jason"];

//parser the post body into javascript object
app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("home");
}); 

// friend list, /friends
app.get("/friends", function(req,res){
    res.render("friends", {friends: friends});
});

app.post("/addfriend",function(req,res){
//    console.log(req.body.newfriend);  //newfriend because the name is newfriend in home.ejs
    friends.push(req.body.newfriend);
    res.redirect("/friends");
})

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started!"); 
});