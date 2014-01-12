var express = require('express');
var http = require('http');

var app = module.exports = express();
app.use(express.logger());

// Function to start server on any port passed to it

function startServer (port) {
    var server = http.createServer(app);
    server.listen(port);
    console.log(server.address);
    console.log(server.settings.env);
    console.log('Listening on port ' + server.address().port);
    server.close();
}

startServer(80);

app.get('/', function(req, res){
  res.send('hello world');
});