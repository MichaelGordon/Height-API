var app = require('../app');
var should = require('should');
var superagent = require('superagent');
var domain = ('http://' + process.env.IP + ':' + process.env.PORT);
var server;

describe('App Testing', function() {

    // Before tests start up the app

    before(function(done) {

        // Set application environment name and port  
        app.set('env', 'test');
        app.set('port', process.env.PORT || 3333);

        // Start app
        server = app.listen(app.get('port'), process.env.IP, (function(err) {
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

    it('Test 1 - App should exist', function(done) {
        should.exist(app);
        done();
    });

    it('Test 2 - App should be listening at ' + process.env.IP + ':' + app.get('port') + '/ and returning status code 200', function(done) {
        superagent.get(domain + '/').end(function(res) {
            res.should.exist;
            res.statusCode.should.eql(200);
        });
        done();
    });

    it('Test 3 - / should contain hello world text', function(done) {
        superagent.get(domain + '/').end(function(res) {
            res.text.should.contain('hello world');
        });
        done();
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