# Height-API #

This is a REST API for OS Terrain 50 using Node.js and Express for the server and MongoDB for the database. 

NOTE: Have not started database integration yet.

## Installation ##

1. Set up server with node.js and MongoDB (or if on AWS just use the Bitnami MEAN AMI on the marketplace)
2. `git fetch https://github.com/MichaelGordon/Height-API.git`
3. The API can be installed with either just the production dependencies (just Express so far) or with the development dependencies too to allow testing (Mocha, Superagent and Should.js). These are defined in the package.json. For production install use `npm install -production`, for dev/testing use `npm install`.
4. If you've installed the development dependencies then you can run `npm test` to run through the various mocha tests that are within the test folder.
5. If you've installed just the production dependencies then start the API with `npm start`.