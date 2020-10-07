var socket = io.connect('http://localhost:8080', { 'forceNew': true });

var display = document.getElementById("display");

var windowHeight = window.innerHeight - 20;
var windowWidth = window.innerWidth - 20;

var playerData = {
    id: "",
    x: 0,
    y: 0
};
let playersList = [

]

window.onresize = changeSize;
window.onload = changeSize;

var game = document.querySelector("body");

function changeSize() {
    windowHeight = window.innerHeight - 20;
    windowWidth = window.innerWidth - 20;
    display.style.height = `${windowHeight}px`;
    display.style.width = `${windowWidth}px`;
}

function movePlayer(playerData) {

    let player = document.getElementById(playerData.id);
    player.style.left = `${playerData.x}px`;
    player.style.top = `${playerData.y}px`;
}

function onPlayerConnected(listNewPlayers) {
    listNewPlayersFiltered = listNewPlayers.filter( p => p.id !== playerData.id)
    console.log(listNewPlayersFiltered, playerData)
    listNewPlayersFiltered.forEach(newPlayer => {
        playerDiv = document.createElement('div');
        playerDiv.setAttribute("id", newPlayer.id);
        playerDiv.classList.add("player")
        display.appendChild(playerDiv)
    });
}
function playerDeleted(id) {
    let element = document.getElementById(id);
    element.parentNode.removeChild(element);
}
game.onkeypress = function (e) {

    if (e.key == 'a') {
        playerData.x = playerData.x - 10;
        //player.style.left = `${playerPosition.x}px`;
    }
    if (e.key == 's') {
        playerData.y = playerData.y + 10;
        //player.style.top = `${playerPosition.y}px`;
    }
    if (e.key == 'd') {
        playerData.x = playerData.x + 10;
        //player.style.left = `${playerPosition.x}px`;
    }
    if (e.key == 'w') {
        playerData.y = playerData.y - 10;
        //player.style.top = `${playerPosition.y}px`;
    }
    socket.emit('move-player', playerData);
};
socket.on('player-deleted', function (id) {
    playerDeleted(id)
})
socket.on('player-moved', function (playerData) {
    movePlayer(playerData);
});
socket.on('on-connect', function (newPlayers) {
    
    onPlayerConnected(newPlayers)
})

socket.on('send-id', function (id) {
    playerDiv = document.createElement('div');
    playerDiv.setAttribute("id", id);
    playerDiv.classList.add("player")
    display.appendChild(playerDiv)
    playerData.id = id;
    console.log(id)
});


