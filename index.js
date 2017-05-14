var restify = require('restify'),
    colors = require('colors'),
    db = require('./models'),
    lib = require('./lib'),
    json = require('jsonwebtoken'),
    socketio = require('socket.io'),
    config = lib.config;

var server = restify.createServer(config.server);

var io = socketio.listen(server.server);

io.sockets.on('connection', function (socket) {
    lib.helpers.setupSockets(socket, lib);
});

restify.CORS.ALLOW_HEADERS.push('x-access-token');

server.use(restify.CORS({
    origins: ['http://localhost:3000']
}))

function unknownMethodHandler(req, res) {
    if (req.method.toLowerCase() === 'options') {
        var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'x-access-token', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With

        if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

        res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
        res.header('Access-Control-Allow-Methods', res.methods.join(', '));
        res.header('Access-Control-Allow-Origin', req.headers.origin);

        return res.send(204);
    } else
        return res.send(new restify.MethodNotAllowedError());
}

server.on('MethodNotAllowed', unknownMethodHandler);



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
            decoded = decoded ? decoded : {
                data: {
                    isAuthorize: false
                }
            }
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