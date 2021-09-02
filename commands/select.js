var start = require("./start");

exports.run = (client, message, selection)=>{
    for(i=0;i<start.vars.playerHands.length;i++){
        if(start.vars.playerHands[i].name == message.author.username){
            var player = start.vars.playerHands[i];
            if(player.isJudge){
                start.chooseRoundWinner(selection);
            }else{
                message.channel.send("you are not the judge, you can't select any cards for judging");
            }
        }
    }    
}