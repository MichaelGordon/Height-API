var app  = require('../app');
var superagent = require('superagent');
var should = require('should');
var http = require('http');

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
  });
 
// Tests
 
  it('Test 1 - App should exist', function (done) {
    should.exist(app);
    done();
  });
 
  it('Test 2 - App should be listening at localhost:3333', function (done) {
    request
       .get('http://localhost:3333/')
       .end(function(res){
           res.should.exist;
           res.statusCode.should.eql(200);
           res.text.should.contain('hello world');
       });
      done();
  });
  
  
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
  
});