// Requires

var app = require('../app');
var should = require('should');
var superagent = require('superagent');

// Set up configs for app in test environment

app.set('env', 'test');
app.set('port', process.env.PORT || 3333);
var port = app.get('port');
var env = app.get('env');
var ip = process.env.IP;
var server;
var domain = ('http://' + ip + ':' + port);

describe('Testing -', function() {

    // Before tests start up the app

    before(function(done) {

        // Start app
        server = app.listen(port, ip, (function(err) {
            if (err) {
                console.log("Error starting the server");
                done(err);
            }
            else {
                console.log("Express server listening on port %d in %s mode on %s", port, env, ip);
                done();
            }
        }));
    });

    // Tests
    
    it('Test 1 - App should exist', function(done) {
        should.exist(app);
        done();
    });
    
    describe('URL', function() {
        
        it('Test 1 - GET - / should redirect to Github repo and return 301', function(done) {
            var agent = superagent.agent();
            agent.get(domain + '/').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.redirects.should.include('https://github.com/MichaelGordon/Height-API');
                done();
            });
        });

    });

    describe('App methods', function() {

        it('Test 1 - GET - /nearest should exist and return 400', function(done) {
            var agent = superagent.agent();
            agent.get(domain + '/nearest').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.should.have.status(400);
                done();
            });
        });

        it('Test 2 - POST - /nearest should exist and returns 405 and json exception - method not allowed', function(done) {
            var agent = superagent.agent();
            agent.post(domain + '/nearest').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.statusCode.should.eql(405);
                res.should.be.json;
                res.body.should.have.property('error', 'Method not allowed');
                done();
            });
        });

        it('Test 3 - DELETE - /nearest should exist and returns 405 json exception - method not allowed', function(done) {
            var agent = superagent.agent();
            agent.del(domain + '/nearest').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.statusCode.should.eql(405);
                res.should.be.json;
                res.body.should.have.property('error', 'Method not allowed');
                done();
            });
        });

    });

    describe('App parameters', function() {

        it('Test 1 - Missing parameter - /nearest returns 400 and json exception - missing parameter', function(done) {
            var agent = superagent.agent();
            agent.get(domain + '/nearest').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.statusCode.should.eql(400);
                res.should.be.json;
                res.body.should.have.property('error', 'Missing parameter - location');
                done();
            });
        });
        
        it('Test 2 - Valid location, postive longitude - /nearest?location=53.478112,0.108100 responds with 200 and returns json', function(done) {
            var agent = superagent.agent();
            agent.get(domain + '/nearest?location=53.478112,0.108100').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.statusCode.should.eql(200);
                res.should.be.json;
                done();
            });
        });
        
        it('Test 3 - Valid location, negative longitude - /nearest?location=53.496702,-2.001469 responds with 200 and returns json', function(done) {
            var agent = superagent.agent();
            agent.get(domain + '/nearest?location=53.496702,-2.001469').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.statusCode.should.eql(200);
                res.should.be.json;
                done();
            });
        });
        
        it('Test 4 - Invalid location - /nearest?location=something responds with 400 and returns json exception', function(done) {
            var agent = superagent.agent();
            agent.get(domain + '/nearest?location=something').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.statusCode.should.eql(400);
                res.should.be.json;
                res.body.should.have.property('error', 'Invalid coordinates for parameter location. Must be WGS84 latitude,longitude');
                done();
            });
        });
 /*       
    describe('Database test', function() {
        
        it('Test 1 - Database exists', function(done) {
           
        });
    });    
    */    
    describe('Content test', function() {
        
        it('Test 1 - Valid location, postive longitude - /nearest?location=53.478112,0.108100 responds with 200 and returns json with location: 53.478112,0.108100 as one of the attributes ', function(done) {
            var agent = superagent.agent();
            agent.get(domain + '/nearest?location=53.478112,0.108100').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.statusCode.should.eql(200);
                res.should.be.json;
                res.body.should.have.property('location', '53.478112,0.108100');
                done();
            });
        });
        
        it('Test 2 - Valid location, negative longitude - /nearest?location=53.496702,-2.001469 responds with 200 and returns json with location: 53.496702,-2.001469 as one of the attributes', function(done) {
            var agent = superagent.agent();
            agent.get(domain + '/nearest?location=53.496702,-2.001469').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.statusCode.should.eql(200);
                res.should.be.json;
                res.body.should.have.property('location', '53.496702,-2.001469');
                done();
            });
        });
        
        });


    });

    // After tests close down the app

    after(function(done) {
        console.log("Stopping the server");
        server.close(function(err) {
            if (err) {
                console.log("Error stopping the server");
                done(err);
            }
            else {
                console.log("Stopped the server");
                done();
            }
        });
    });

});