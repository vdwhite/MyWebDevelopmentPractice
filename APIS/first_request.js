var request = require("request");

//body, the actual content body
request("https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(error, response, body){
    if(!error && response.statusCode == 200){

        //parse string into object
        var parsedData = JSON.parse(body);
        
        var sunsetTime = parsedData["query"]["results"]["channel"]["astronomy"]["sunset"];
        console.log("Sunset time for Hawaii for today is: "+ sunsetTime);
    }  
    //if there's error
    else{
        console.log("Something is wrong!");
        console.log(error);
    }
});