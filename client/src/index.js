var socket = io.connect('http://localhost:8080', { 'forceNew': true });

var display = document.getElementById("display");
var player = document.getElementById("player");

var windowHeight = window.innerHeight - 20;
var windowWidth = window.innerWidth - 20;

var playerPosition = {
    x: windowWidth / 2,
    y: windowHeight / 2
};

player.style.left = `${playerPosition.x}px`;
player.style.top = `${playerPosition.y}px`;

window.onresize = changeSize;
window.onload = changeSize;

var game = document.querySelector("body");

function changeSize() {
    windowHeight = window.innerHeight - 20;
    windowWidth = window.innerWidth - 20;
    display.style.height = `${windowHeight}px`;
    display.style.width = `${windowWidth}px`;
}

function movePlayer(playerPosition){
    player.style.left = `${playerPosition.x}px`;
    player.style.top = `${playerPosition.y}px`;
}

game.onkeypress = function (e) {

    if (e.key == 'a') {
        playerPosition.x = playerPosition.x - 10;
        //player.style.left = `${playerPosition.x}px`;
    }
    if (e.key == 's') {
        playerPosition.y = playerPosition.y + 10;
        //player.style.top = `${playerPosition.y}px`;
    }
    if (e.key == 'd') {
        playerPosition.x = playerPosition.x + 10;
        //player.style.left = `${playerPosition.x}px`;
    }
    if (e.key == 'w') {
        playerPosition.y = playerPosition.y - 10;
        //player.style.top = `${playerPosition.y}px`;
    }
    socket.emit('move-player', playerPosition);
};

socket.on('player-moved', function (playerPosition) {
    movePlayer(playerPosition);
});


