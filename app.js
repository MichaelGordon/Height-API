var express = require('express');

var app = module.exports = express();

app.use(express.logger());
app.configure(function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

// Nearest resource

// Accept all methods
app.all('/nearest', function(req, res) {

    // If the method is GET then do something with it
    if (req.method === 'GET') {

        // If location parameter has been sent then return something
        if (req.query.location) {
            res.send(200, {
                'location': 'something'
            });
        }
        // If location paramter is missing then give correct HTTP code and informative JSON message
        else {
            res.send(400, {
                'error': 'Missing parameter - location'
            });
        }
    }
    // Any other method give correct HTTP code and informative JSON message
    else {
        res.send(405, {
            'error': 'Method not allowed'
        });
    }
});

// Allow app to be started up externally by test but if not start it in development mode

if (!module.parent) {
    app.set('env', process.env.NODE_ENV || 'development');
    app.set('port', process.env.PORT || 80);
    app.listen(app.get('port'), process.env.IP || '0.0.0.0', function() {
        console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
    });
}