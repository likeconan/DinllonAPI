var restify = require('restify'),
    colors = require('colors'),
    db = require('./models'),
    lib = require('./lib'),
    json = require('jsonwebtoken'),
    config = lib.config

var server = restify.createServer(config.server);

server.use(restify.queryParser());
server.use(restify.bodyParser());

restify.defaultResponseHeaders = function (data) {
    this.header('Access-Control-Allow-Origin', '*');
}

/**
Validate each request, as long as there is a schema for it
*/
// server.use(function(req, res, next) { 	var results =
// lib.schemaValidator.validateRequest(req) 	if(results.valid) { 		next() 	}
// else { 		res.send(400, results) 	} }) server.use(function (req, res, next) {
//    var token = req.headers['x-access-token'];     if (token) {
// json.verify(token, config.secretKey, function (err, decoded) {             if
// (err) {                 res.json({ success: false })             } else {
//             req.decoded = decoded;                 next();             }
//    })     } else {         return res.send(403, {             success: false,
//             message: 'No token'         });     } })

lib
    .helpers
    .setupRoutes(server, lib)

server.listen(config.server.port, function () {
    console.log("Server started succesfully...".green)
})