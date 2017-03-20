var utils = require('sequelize').Utils;

module.exports = {
    setupRoutes: setupRoutes,
    excludeRoutes: excludeRoutes,
    generateFilePath: generateFilePath
}

function setupRoutes(server, lib) {
    for (controller in lib.controllers) {
        cont = new lib.controllers[controller](lib)
        cont.setUpActions(server)
    }
}

function generateFilePath(from) {
    utils.generateUUID()
}

function excludeRoutes(routename) {
    if (routename.indexOf('ignore') >= 0) {
        return true;
    } else {
        return false;
    }
}