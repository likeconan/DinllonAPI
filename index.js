var restify = require('restify'),
    colors = require('colors'),
    db = require('./models'),
    lib = require('./lib'),
    json = require('jsonwebtoken'),
    config = lib.config

var server = restify.createServer(config.server);
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

server.use(restify.CORS({
    origins: ['http://localhost:3000'],
}))

/**
Validate each request, as long as there is a schema for it
*/



server.use(function (req, res, next) {
    if (lib.helpers.excludeRoutes(req.route.name)) {
        next();
        return;
    }
    var token = req.headers['x-access-token'];
    if (token) {
        json.verify(token, config.secretKey, function (err, decoded) {
            if (err || decoded.data.isAuthorize) {
                res.send(403);
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.send(403, {
            success: false,
            message: 'No token'
        });
    }
})

lib
    .helpers
    .setupRoutes(server, lib)

server.listen(config.server.port, function () {
    console.log("Server started succesfully...".green)
})