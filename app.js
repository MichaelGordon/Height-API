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

if (!module.parent) {
  app.listen(port, host, function () {
    console.log(process.env.NODE_ENV);
    console.log("Express server listening on port %d in %s mode",
    process.env.port,
    process.env.NODE_ENV
  );
  })}
else {
  app.listen(3000);
  console.log(process.env.NODE_ENV);
    console.log("Express server listening on port %d in %s mode",
    process.env.port,
    process.env.NODE_ENV
  );
}
