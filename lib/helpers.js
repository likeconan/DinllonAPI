var utils = require('sequelize').Utils;

module.exports = {
    setupRoutes: setupRoutes,
    generateFilePath: generateFilePath
}

function setupRoutes(server, lib) {
    for (controller in lib.controllers) {
        cont = new lib.controllers[controller](lib.db)
        cont.setUpActions(server)
    }
}

function generateFilePath(from) {
    utils.generateUUID()
}