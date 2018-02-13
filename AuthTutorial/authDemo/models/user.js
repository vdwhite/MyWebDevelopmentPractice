var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    user:String,
    password: String
});

//put passportLocalMongoose to user shcema
// the plugin that do salting, hasing 
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user",userSchema);

