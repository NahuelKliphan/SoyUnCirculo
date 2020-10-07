var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

let players = [];

server.listen(8080, function () {
    console.log('salio esa pa');
});
io.on('connection', function (socket) {

    io.to(socket.id).emit('send-id', socket.id);
    io.to(socket.id).emit('send-players-exist', players);

    let newPlayer = { id: socket.id, x: 0, y: 0 };
    players.push(newPlayer);

    io.emit('new-player', newPlayer);

    socket.on('move-player', function (playerData) {
        players.forEach(player => {
            if (player.id === socket.id) {
                player.x = playerData.x;
                player.y = playerData.y
            }

        });
        io.emit('player-moved', playerData);
    });

    socket.on('disconnect', function () {

        let jugador = { id: socket.id, x: 0, y: 0 };
        let i = players.indexOf(jugador.id);
        players.splice(i, 1);
        io.emit('player-deleted', socket.id);
    });
});

