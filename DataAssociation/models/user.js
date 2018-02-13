var mongoose = require("mongoose");

// user model
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post"
    }]
}) ;

//export an object
module.exports = mongoose.model("User",userSchema);
