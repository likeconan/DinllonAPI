var restify = require('restify'),
    colors = require('colors'),
    db = require('./models'),
    lib = require('./lib'),
    json = require('jsonwebtoken'),
    config = lib.config

var server = restify.createServer(config.server);

restify
    .CORS
    .ALLOW_HEADERS
    .push('x-access-token');

server.use(restify.CORS({
    origins: ['http://localhost:3000']
}))

server.use(restify.fullResponse());

server.use(restify.queryParser());
server.use(restify.bodyParser({
    maxBodySize: 1024 * 1024 * 2,
    mapParams: true,
    mapFiles: false,
    overrideParams: false,
    keepExtensions: true,
    uploadDir: config.filePath,
    multiples: true,
    hash: 'sha1'
}));

/**
Validate each request, as long as there is a schema for it
*/

server.use(function (req, res, next) {

    json
        .verify(req.headers['x-access-token'], config.secretKey, function (err, decoded) {
            if (lib.helpers.excludeRoutes(req.route.name)) {
                req.decoded = decoded;
                next();
                return;
            }
            if (err || !decoded.data.isAuthorize) {
                res.send(403, {
                    success: false,
                    message: 'Not authorized'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
})

lib
    .helpers
    .setupRoutes(server, lib)

server.listen(config.server.port, function () {
    console.log("Server started succesfully...".green)
})