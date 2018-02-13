var express         = require("express");
var mongoose        = require("mongoose");
var passport        = require("passport");
var bodyParser      = require("body-parser");
var LocalStrategy   = require("passport-local");
var passportLocalMongoose =require("passport-local-mongoose");
var User = require("./models/user");


mongoose.connect("mongodb://localhost/auth-demo");



var app = express();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
   secret: "Cute",
   resave: false,
   saveUnitnitialized: false
}));

//setup passport

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));



//session encode and unencode
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





//routes

app.get("/",function(req,res){
   res.render("home"); 
});

app.get("/secret",isLoggedIn, function(req,res){
    
    //middleware to check if it's login
    
    res.render("secret");
});

//auth routes

//show sign up form
app.get("/reg",function(req,res){
    res.render("register");
});

//hanlde new user sign up
app.post("/reg",function(req,res){
    req.body.username 
    req.body.password
    
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
       if(err){
           console.log(err);
           //if err go back to register form
           res.redirect("register");
       } else {
           
       // take everything in the section, run the serialized part
       // if the user is created, log the user in and redirect to secret
       // user local strategy here, can be twitter or facebook ...
           passport.authenticate("local")(req,res,function(){
               res.redirect("/secret");
           });
       }
    });
});

//login routes
app.get("/login",function(req,res){
    res.render("login");
});


//middle ware: code run before final callback
app.post("/login",passport.authenticate("local",{
    //login logic
    successRedirect: "/secret",
    failureRedirect:"/"
}),function(req,res){});


//logout
app.get("/logout",function(req,res){
    req.logout();//passport destroied user data in session
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login"); 
}

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server STARTED!");
});