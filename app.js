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
app.all('*', checkMethod, checkURL, paramExist, paramValue, function(req, res, next) {
    next();
});

// Check method - only allow GET
function checkMethod(req, res, next) {
    // If the method is GET then do something with it 
    if (req.method === 'GET') {
        next();
    }
    // Any other method give correct HTTP code and informative JSON message 
    else {
        res.json(405, {
            'error': 'Method not allowed'
        });
    }
}

// Check URL is correct path
function checkURL(req, res, next) {
    // If path is nearest then route on, otherwise redirect to Github repo
    if (req.path == '/nearest') {
        next();
    }
    else {
        res.redirect(301, 'https://github.com/MichaelGordon/Height-API');
    }
}

// Check location parameter exists
function paramExist(req, res, next) {
        // If location query has been sent then return something  
    if (req.query.location) {
        next();
    }
    // If location paramter is missing then give correct HTTP code and informative JSON message
    else {
        res.json(400, {
            'error': 'Missing parameter - location'
        });
    }
    }

// Parameter value checker function
function paramValue(req, res) {
    
    // Store location query values and test against lat, lon regex
    var location = req.query.location;
    var reg = new RegExp ("^([-+]?\\d{1,2}([.]\\d+)?),\\s*([-+]?\\d{1,3}([.]\\d+)?)$");

    if (reg.test(location)) {
         getData(req, res, location);
    }
    
    // If location parameter value is not lat, long then give correct HTTP code and informative JSON message 
    else {
        res.json(400, {
            'error': 'Invalid coordinates for parameter location. Must be WGS84 latitude,longitude'
        });
    }
}

function getData(req, res, location) {
    return res.json(200,  {'location': '53.478112,0.108100'});
}

// Insert to db db.test.insert( {location: "53.478112,0.108100"} )

// Find with db.test.find({"location" : "53.478112,0.108100"})

// Allow app to be started up externally by test but if not start it in development mode

if (!module.parent) {
    app.set('env', process.env.NODE_ENV || 'development');
    app.set('port', process.env.PORT || 80);
    var ip = process.env.IP;
    app.listen(app.get('port'), process.env.IP || '0.0.0.0', function() {
        console.log("Express server listening - http://%s:%d in %s mode", ip, app.get('port'), app.get('env') );
    });
}