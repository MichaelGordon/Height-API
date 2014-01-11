var express = require('express');
var http = require('http');

var app = module.exports = express();
app.use(express.logger());

var server = http.createServer(app);

app.get('/', function(req, res){
  res.send('hello world');
});

 

server.listen(80);
console.log('Listening on port ' + server.address().port);
server.close();
 
// Make sure app is not started on default port if part of test suite

if (!module.parent) {
  app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode",
    app.address().port,
    app.settings.env
  );
});
};