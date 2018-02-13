var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


// post model - title, content 
var postSchema = new mongoose.Schema({
   title: String,
   content: String,
});

var Post = mongoose.model("Post",postSchema);


// user model
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
}) ;

var User = mongoose.model("User",userSchema);

/*
// one to many
var newUser = new User({
    email: "new2@example.com",
    name: "nash2", // a list of posts
});

//create a post and push to posts array
newUser.posts.push({
   title:"text2",
   content:"example2"
});

//save them

newUser.save(function(err,user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
});
*/

User.findOne({name:"nash2"},function(err,foundUser){
    if(err){
        console.log(err);
    } else {
  //      console.log(foundUser);
        //push a new post
        foundUser.posts.push({
            title:"3 things!",
            content:"awwwww"
        });
        //save to the user
        foundUser.save(function(err,foundUser){
            if(err){
                console.log(err);
            } else {
                console.log(foundUser);
            }
        })
    }
})

/*
var newPost = new Post({
    title:"Example post1",
    content:"what ever man"
});

newPost.save(function(err,post){
    if(err){
        console.log(err);
    } else {
        console.log(post);
    }
});*/