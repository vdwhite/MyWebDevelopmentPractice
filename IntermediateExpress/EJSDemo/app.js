var express = require("express");
var app= express();


// tell express to use the directory "public"
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
   //res.send("<h1>Welcome to homepage</h1>"); 
});

// /fallinlovewith/thing
app.get("/fall-in-love-with/:thing",function(req,res){
    var thing = req.params.thing;
    
    //ejs brackets, pass thing to thingVar
    res.render("love",{thingVar:thing});
//    res.send("You love "+thing);
});

app.get("/posts",function(req,res){
   var posts = [
       {title: "post1", author:"ken"},
       {title: "post2", author:"ryu"},
       {title: "post3", author:"gouki"},
       ];
    res.render("post", {post: posts});
});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("server started!");
});