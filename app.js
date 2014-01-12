var express = require('express');
var http = require('http');

var app = module.exports = express();

app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 3000);

app.use(express.logger());
app.configure(function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res){
  res.send('hello world');
});

if (!module.parent) {
  app.listen(port, host, function () {
    console.log("Express server listening on port %d in %s mode",
    port,
    app.env
  );
  })}
else {
  app.listen(port);
    console.log("Express server listening on port %d in %s mode",
    port,
    app.env
  );
}
