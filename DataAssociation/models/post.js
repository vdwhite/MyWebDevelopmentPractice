var mongoose = require("mongoose");


// post model - title, content 
var postSchema = new mongoose.Schema({
   title: String,
   content: String,
});

//what sending out  
module.exports = mongoose.model("Post",postSchema);