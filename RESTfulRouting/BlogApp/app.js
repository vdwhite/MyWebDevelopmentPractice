var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

var app = express();


//title
//image url
//blog text -> body

//app config
mongoose.connect("mongodb://localhost/restful-blog-app");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());

//listen to _method
app.use(methodOverride("_method")); //when ever has _method, take that after it

//mongoose model
var blogSchema = new mongoose.Schema({
   title: String,
   image: {
           type: String, 
           default:"image.jpg"},
   body: String,
   created: {
             type: Date,
             default: Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

//RESTful routes

//index route
app.get("/",function(req,res){
    res.redirect("/blog");
})

app.get("/blog",function(req,res){
     Blog.find({},function(err,blogs){
         if(err){
             console.log(err);
         }else{
             res.render("index",{blogs:blogs}); 
         }
     });
});

// new route
app.get("/blog/new",function(req,res){
    res.render("new");
});


//create route
app.post("/blog",function(req,res){
    
    //sanitizer
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    //create blog
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blog");
        }
    });
    //redirect
});

//show route
app.get("/blog/:id",function(req,res){
    Blog.findById(req.params.id, function(err,foundPost){
       if(err){
           res.redirect("/blog");
       }else{
            res.render("show", {post:foundPost});
       }
    });
    
});

//edit route
app.get("/blog/:id/edit",function(req,res){
   Blog.findById(req.params.id,function(err,foundPost){
        if(err){
            res.redirect("/blog");
        }else{
            res.render("edit",{post:foundPost});   
        }     
   })
});

//update route
app.put("/blog/:id",function(req,res){
    // findByIdAndUpdate(id, newData, callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, foundPost){
       if(err){
           res.redirect("/blog");
       } else{
           res.redirect("/blog/"+req.params.id);
       }
    });
});

//delete route
app.delete("/blog/:id",function(req,res){
    //destory blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send("ERRRRORR!");
        }else{
            res.redirect("/blog");
        }
    })
    //redirect somewhere
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server started!");
})