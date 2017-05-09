module.exports = {
    setupRoutes: setupRoutes,
    setupSockets: setupSockets,
    excludeRoutes: excludeRoutes
}

function setupRoutes(server, lib) {
    for (controller in lib.controllers) {
        cont = new lib.controllers[controller](lib)
        cont.setUpActions(server)
    }
}

function setupSockets(socket, lib) {
    for (sk in lib.sockets) {
        new lib.sockets[sk](socket)
    }
}

function excludeRoutes(routename) {
    if (routename.indexOf('ignore') >= 0) {
        return true;
    } else {
        return false;
    }
}