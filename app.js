var express = require('express');
var http = require('http');

var app = module.exports = express();
app.use(express.logger());
app.configure(function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Function to start server on any port passed to it

function startServer (port) {
    console.log('Port should be ' + port);
    console.log(app);
    var server = http.createServer(app).listen(port);
    for (var i=0; i < server.address.length; i++) {
        console.log(server.address.length);
        console.log(server.settings.length);
        console.log(server.address(arguments[i]));
    }
    for (var j=0; j < app.settings.length; j++) {
        console.log(app.settings.length);
        console.log(app.settings(arguments[j]));
    }
    //console.log(server.settings.env);
    //console.log('Listening on port ' + server.address().port);
    server.close();
}

startServer(80);

app.get('/', function(req, res){
  res.send('hello world');
});