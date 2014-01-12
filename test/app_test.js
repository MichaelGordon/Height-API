var app  = require('../app');
var port = 3333;
var superagent = require('superagent');
var should = require('should');
var http = require('http');

// Helper utility to format request from http://51elliot.blogspot.co.uk/2013/08/testing-expressjs-rest-api-with-mocha.html

function defaultGetOptions(path) {
  var options = {
    "host": "localhost",
    "port": port,
    "path": path,
    "method": "GET",
  };
  return options;
}

describe('app', function(){

// Before tests start up the app

  before (function (done) {
    app.set('port', port);
    app.listen(function (err, result) {
      if (err) {
          console.log("Error starting the server");
        done(err);
      } else {
          console.log("Started the server");
        done();
      }
    });
  });

// After tests close down the app

  after(function (done) {
      console.log("Stopped the server");
    app.close();
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