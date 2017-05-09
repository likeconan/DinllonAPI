var env = process.env.NODE_ENV || 'development';
var lib = {
    config: require("./config")[env],
    controllers: require("../controllers"),
    sockets: require('../sockets'),
    helpers: require("./helpers"),
    db: require("../models"),
    queries: require('./queries')
}

module.exports = lib
