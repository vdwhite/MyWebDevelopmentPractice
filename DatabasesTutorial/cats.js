var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");

// model/ pattern of the data to a model
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat",catSchema); // collection of "cats", put singular version "cat" as name

/*
// add a new cat to database
var bush = new Cat ({
    name: "Bush",
    age:"11",
    temperament:"dollar"
});

//pass a callback function when the save is done, to check whether save or not
//once the process is done, call back, same for .remove, .find, ...etc
bush.save(function(err, cat){
    if(err){
        console.log("can't save");
    }else{
        console.log("save a cat to database");
        console.log(cat); // being sent back from the database
        
    }
});

var mofa = new Cat({
    name:"Jiang",
    age:"inf",
    temperament:"angry"
});
*/
// use create to new aand save all at once
Cat.create({
   name:"What is name",
   age:15,
   temperament:"no temp"
},function(err,cat){
    if(err){
        console.log("error" + err);
    }else{
        console.log("Save a cat to db:" + cat);
    }
});
//retrieve all cats from database
//pass no object, since want all
Cat.find({},function(err,cats){
    if(err){
        console.log("There is an error");
        console.log(err);
    }else{
        console.log("cattttts");
        console.log(cats);
    }
});