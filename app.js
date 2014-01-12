var express = require('express');
var http = require('http');

var app = module.exports = express();
app.use(express.logger());
app.configure(function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);

if (!module.parent) {
  app.listen(port, host, function () {
    console.log("Express server listening on port %d in %s mode",
    app.address().port,
    app.settings.env
  );
  });
}