var socket = io.connect('http://localhost:8080', { 'forceNew': true });

var display = document.getElementById("display");

var windowHeight = window.innerHeight - 20;
var windowWidth = window.innerWidth - 20;

var playerLocal = {
    id: "",
    x: 0,
    y: 0
};

let playersList = [];

window.onresize = changeSize;
window.onload = changeSize;

var game = document.querySelector("body");

function changeSize() {
    windowHeight = window.innerHeight - 20;
    windowWidth = window.innerWidth - 20;
    display.style.height = `${windowHeight}px`;
    display.style.width = `${windowWidth}px`;
}

function movePlayer(playerLocal) {

    let player = document.getElementById(playerLocal.id);
    player.style.left = `${playerLocal.x}px`;
    player.style.top = `${playerLocal.y}px`;
}

function renderPlayers(listNewPlayers) {

    display.innerHTML = "";
    
    listNewPlayers.forEach(newPlayer => {
        renderPlayer(newPlayer);
    });

    renderPlayer(playerLocal);

}
function playerDeleted(id) {
    let element = document.getElementById(id);
    element.parentNode.removeChild(element);
}
game.onkeypress = function (e) {

    if (e.key == 'a') {
        playerLocal.x = playerLocal.x - 10;
    }
    if (e.key == 's') {
        playerLocal.y = playerLocal.y + 10;
    }
    if (e.key == 'd') {
        playerLocal.x = playerLocal.x + 10;
    }
    if (e.key == 'w') {
        playerLocal.y = playerLocal.y - 10;
    }
    socket.emit('move-player', playerLocal);
};

socket.on('player-deleted', function (id) {
    playerDeleted(id)
});

socket.on('player-moved', function (playerLocal) {
    movePlayer(playerLocal);
});

socket.on('send-players-exist', function (newPlayers) {
    renderPlayers(newPlayers);
});

socket.on('send-id', function (id) {
    playerLocal.id = id;
});

socket.on('new-player', function (newPlayer) {

    if (playerLocal.id !== newPlayer.id) {
        playersList.push(newPlayer);
        renderPlayer(newPlayer);
    }
});

function renderPlayer(player) {

    let playerDiv = document.createElement('div');
    playerDiv.setAttribute("id", player.id);
    playerDiv.classList.add("player");
    playerDiv.style.left = `${player.x}px`;
    playerDiv.style.top = `${player.y}px`;
    playerDiv.innerHTML = player.id;
    playerDiv.style.background = playerLocal.id == player.id ? "red" : "blue";
    display.appendChild(playerDiv);

}