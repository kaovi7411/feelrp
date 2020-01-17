var http = require('http');

http.createServer(function (req, res) {  
   res.write("Deneme");
   res.end();
   }).listen(8080)