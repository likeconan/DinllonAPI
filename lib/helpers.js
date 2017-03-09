module.exports = {
    setupRoutes: setupRoutes
}

function setupRoutes(server, lib) {
    for (controller in lib.controllers) {
        cont = new lib.controllers[controller](lib.db)
        cont.setUpActions(server)
    }
}