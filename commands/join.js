var main = require("./playCards");

var thePlayers = [];
var thePlayerIds = [];

exports.vars = {
    thePlayers,
    thePlayerIds
}

exports.run = (client, message, cmd, words)=>{
    if(!main.vars.gameStarted){
        
        main.vars.playerIDs.push(message.author.id);
        main.vars.players.push(message.author.username);
    }
    else{
        message.channel.send("Sorry, the game is already in session. Please wait until the next lobby is created to join");
    }
}
