var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo2");


var Post = require("./models/post");
var User = require("./models/user");



/*
User.create({
   email: "exampleRef@gmail.com",
   name: "Steve Sucks"
});
*/


Post.create({
    title:"Burger 45",
    content:"any content"
},function(err,post){
    //found the user
    User.findOne({email:"exampleRef@gmail.com"},function(err,foundUser){
        if(err){
            console.log(err);
        } else{
            // push the created post to user
            foundUser.posts.push(post);
            
            //save the user
            foundUser.save(function(err, newPost){
                if(err){
                    console.log(err);
                } else{
                    console.log(newPost);
                }
            })
        }
    });
});




//find user
User.findOne({email:"exampleRef@gmail.com"}).populate("posts").exec(function(err,user){
    if(err){
        console.log(err);
    } else{
        console.log(user);}
});

//find post of the user
