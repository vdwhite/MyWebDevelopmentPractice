var faker = require("faker");
for(var i=0;i<10;i++){
    var fakeName = faker.commerce.product();
    var fakePrice = faker.commerce.price();
    console.log(fakeName + " - $" +fakePrice);
}
