var currentPlayers = [];
var lobbyInSession = false;

var gameStarted = false;
var players = [];
var playerIDs = [];
var humanityRules = "To join this lobby of Cards against Humanity, type |join\nTo start the game, type |playCards again";
var join = require('./join.js')
var currentChannel;

exports.vars = {
    gameStarted,
    players,
    playerIDs
    }

exports.run = (client, message, cmd, words)=>{
    currentChannel = message.channel;
    if(!lobbyInSession && !gameStarted){
        message.channel.send('Starting a game of Cards against humanity!```To join this lobby of Cards against Humanity, type |join\nTo start the game, type |playCards again```');
        lobbyInSession = true;
        players.push(message.author.username);
        console.log(message.author.username)
        playerIDs.push(message.author.id);
    }else if(lobbyInSession && !gameStarted){
        message.channel.send("Starting the game now!");
        var startGame = require('./start');
        startGame.run(client, message, cmd, words);
    }else{
        message.channel.send("There is already a card game in progress, please wait until it has finished before starting another");
    }
    
}

exports.addPlayer = (client, message, cmd, words)=>{
    if(!gameStarted){
        players.push(messge.author.username);
        playerIDs.push(message.author.id);
        
    }
   
}

exports.endGame = (winner)=>{
    currentChannel.send("The game is over\n"+winner+" has won!");
    gameStarted = false;
    lobbyInSession = false;
    players = [];
    playerIDs = [];
}