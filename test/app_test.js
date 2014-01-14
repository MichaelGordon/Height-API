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

        it('Test 2 - GET - /nearest returns json exception - missing parameter', function(done) {
            var agent = superagent.agent();
            agent.get(domain + '/nearest').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.should.be.json;
                res.body.should.have.property('error', 'Missing parameter - location');
                done();
            });
        });

        it('Test 3 - POST - /nearest should exist and return 405', function(done) {
            var agent = superagent.agent();
            agent.post(domain + '/nearest').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.statusCode.should.eql(405);
                done();
            });
        });

        it('Test 4 - POST - /nearest returns json exception - method not allowed', function(done) {
            var agent = superagent.agent();
            agent.post(domain + '/nearest').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.should.be.json;
                res.body.should.have.property('error', 'Method not allowed');
                done();
            });
        });

        it('Test 5 - DELETE /nearest should exist and return 405', function(done) {
            var agent = superagent.agent();
            agent.del(domain + '/nearest').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.statusCode.should.eql(405);
                done();
            });
        });

        it('Test 6 - DELETE - /nearest returns json exception - method not allowed', function(done) {
            var agent = superagent.agent();
            agent.del(domain + '/nearest').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.should.be.json;
                res.body.should.have.property('error', 'Method not allowed');
                done();
            });
        });
    });

    describe('App parameters', function() {

        it('Test 1 - GET - /nearest?location=something returns something', function(done) {
            var agent = superagent.agent();
            agent.get(domain + '/nearest?location=something').end(function(err, res) {
                should.not.exist(err);
                res.should.exist;
                res.statusCode.should.eql(200);
                res.should.be.json;
                res.body.should.have.property('location', 'something');
                done();
            });
        });
    });
    /*
        it('Test 6 - /nearest should return 400 for any other parameter', function(done) {
            var agent = superagent.agent();
            agent.get(domain + '/nearest?badparameter=bad').end(onResponse);

            function onResponse(err, res) {
                err.should.not.exist;
                res.should.exist;
                res.statusCode.should.eql(400);
                console.log(res.statusCode);
                return done();
            }
        });
    });
*/
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