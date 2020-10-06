var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(8080, function () {
    console.log('Servidor corriendo en http://localhost:8080');
});

io.on('connection', function (socket) {
 
    socket.on('move-player', function (playerPosition) {
        io.emit('player-moved', playerPosition);
    });

});

