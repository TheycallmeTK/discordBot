var start = require("./start");
var playerHands = require("./start").getHands();

exports.run = (client, message, selection)=>{
    for(i=0;i<playerHands.length;i++){
        if(playerHands[i].name == message.author.username){
            var player = playerHands[i];
            if(player.isJudge){
                start.chooseRoundWinner(selection);
            }else{
                message.channel.send("you are not the judge, you can't select any cards for judging");
                //bypass for testing purposes
                //start.chooseRoundWinner(selection);
            }
        }
    }    
}