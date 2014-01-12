var app  = require('../app');
var superagent = require('superagent');
var should = require('should');
var http = require('http');

// Helper utility to format request from http://51elliot.blogspot.co.uk/2013/08/testing-expressjs-rest-api-with-mocha.html

function defaultGetOptions(path) {
  var options = {
    "host": "localhost",
    "port": app.get('port'),
    "path": path,
    "method": "GET",
  };
  return options;
}

describe('app', function(){

// Before tests start up the app

  before (function (done) {
      
    // Set application environment name and port  
    app.set('env', 'test');
    app.set('port', 3333);
    
    // Start app
    app.listen(app.get('port'), '0.0.0.0', (function (err) {
      if (err) {
        console.log("Error starting the server");
        done(err);
      } 
      else {
        console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
        done();
      }
    }));

// After tests close down the app

  after(function (done) {
    console.log("Stopping the server");
    app.close(function (err) {
      if (err) {
          console.log("Error starting the server");
          done(err);
      }
      else {
        console.log("Stopped the server");
        done();
      }
    });
  });
 
// Tests
 
  it('Test 1 - App should exist', function (done) {
    should.exist(app);
    done();
  });
 
  it('Test 2 - App should be listening at localhost:3333', function (done) {
    var headers = defaultGetOptions('/');
    http.get(headers, function (res) {
      res.statusCode.should.eql(404);
      done();
    });
  });
});  