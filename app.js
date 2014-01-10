var express = require('express');
var app = express();


app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(80);
 
 

// Make sure app is not started on default port if part of test suite

if (!module.parent) {
  app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode",
    app.address().port,
    app.settings.env
  );
});
};