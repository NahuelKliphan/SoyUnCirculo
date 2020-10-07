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

function recibePlayersList(listNewPlayers) {

    display.innerHTML = "";

    listNewPlayers.forEach(newPlayer => {
        playerDiv = document.createElement('div');
        playerDiv.setAttribute("id", newPlayer.id);
        playerDiv.classList.add("player");
        display.appendChild(playerDiv);
    });

    playerDiv = document.createElement('div');
    playerDiv.setAttribute("id", playerData.id);
    playerDiv.classList.add("player");
    display.appendChild(playerDiv);

}
function playerDeleted(id) {
    let element = document.getElementById(id);
    element.parentNode.removeChild(element);
}
game.onkeypress = function (e) {

    if (e.key == 'a') {
        playerData.x = playerData.x - 10;
    }
    if (e.key == 's') {
        playerData.y = playerData.y + 10;
    }
    if (e.key == 'd') {
        playerData.x = playerData.x + 10;
    }
    if (e.key == 'w') {
        playerData.y = playerData.y - 10;
    }
    socket.emit('move-player', playerData);
};
socket.on('player-deleted', function (id) {
    playerDeleted(id)
})
socket.on('player-moved', function (playerData) {
    movePlayer(playerData);
});
socket.on('send-players-exist', function (newPlayers) {
    recibePlayersList(newPlayers);
});

socket.on('send-id', function (id) {

    console.log(id)

    playerData.id = id;

});

socket.on('new-player', function (newPlayer) {

    if(playerData.id !== newPlayer.id){
        playersList.push(newPlayer);
        recibePlayersList(playersList);
    }

    console.log(playersList)

});


