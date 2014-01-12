var express = require('express');
var http = require('http');

var app = module.exports = express();
app.use(express.logger());
app.configure(function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

startServer(80);

// Function to start server on any port passed to it

function startServer (portNumber) {
    console.log('Port should be ' + portNumber);
    var server = http.createServer(app);
    server.listen(portNumber);
    console.log('Listening on port ' + server.address.port);
    server.close();
}

app.get('/', function(req, res){
  res.send('hello world');
});