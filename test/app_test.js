var app  = require(__dirname + '/../app.js');
var port = 3333;
// var superagent = require('superagent');
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
    app.listen(port, function (err, result) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

// After tests close down the app

  after(function (done) {
    app.close();
  });
 
// Tests
 
  it('should exist', function (done) {
    should.exist(app);
    done();
  });
 
  it('should be listening at localhost:3333', function (done) {
    var headers = defaultGetOptions('/');
    http.get(headers, function (res) {
      res.statusCode.should.eql(404);
      done();
    });
  });
  
});  