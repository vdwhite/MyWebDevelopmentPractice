var express = require("express");
var request = require("request");

var app = express();
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("search");
})

app.get("/result",function(req,res){
    
    // get the name "search" from search.ejs
    var searchTerm = req.query.search;
    var url = "http://www.omdbapi.com/?s="+searchTerm+"&apikey=thewdb"; 
    
    //do API call here
    request(url, function(err,response,body){
        if(!err&&response.statusCode==200){
            var parsedData = JSON.parse(body); // js object
            console.log(parsedData);
            
            res.render("result", {result:parsedData});
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started!");
})