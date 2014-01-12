var express = require('express');
var http = require('http');

app = module.exports = express();

app.use(express.logger());
app.configure(function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res){
  res.send('hello world');
});

if (!module.parent) {
    app.set('env', process.env.NODE_ENV || 'development');
    app.set('port', process.env.PORT || 80); 
    app.listen(app.get('port'), '0.0.0.0', function () {
        console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
    });
}