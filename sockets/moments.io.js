class MomentIO {
    constructor(socket) {
        this.addSocketActions(socket)
    }

    addSocketActions(socket) {
        socket.emit('testevent', { hello: 'world' });

        socket.on('my other event', function (data) {
            console.log(data);
        });
    }
}

module.exports = MomentIO