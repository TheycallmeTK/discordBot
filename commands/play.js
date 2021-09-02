var main = require("./playCards");
var white = require("./cardDecks/whiteDeck.json");
var start = require("./start");
var numCards = 1;

exports.vars = {
    numCards
}

exports.run = (client, message, c)=>{
    if(start.vars.canPlay){
        if(c.length != numCards){
            message.channel.send("you did not play the correct amount of cards. Please input your selections again");
            return;
        }
        for(i=0;i<start.vars.playerHands.length;i++){
            //match username and set the cards
            if(start.vars.playerHands[i].name == message.author.username){
                if(start.vars.playerHands[i].isJudge){
                    message.channel.send("you are the judge, you can't play any cards this round");
                    return;
                }
                pushHand(start.vars.playerHands[i]);
                return;
            }
        }
    } else{
        message.channel.send("You cannot play any cards right now");
    }
    
}

var pushHand = (player)=>{
    //push the cards to the playingCards array and pull a new card from the deck
    for(j=0;j<c.length;j++){
        player.playingCards.push(player.hand[c[j]]);
        player.hand.splice(c[j], 1);
        var num = Math.floor(Math.random()*white.cards.length);
        player.hand.push(white.cards[num]);
    }
    //set player as ready and check to see if all players are ready
    player.hasPlayed = true;
    var ready = true;
    for(i=0;i<start.vars.playerHands.length;i++){
        if(!start.vars.playerHands[i].hasPlayed && !start.vars.playerHands[i].isJudge){ready = false;}
    }
    if(ready){
        start.doRound();
    } else{
        message.channel.send(player.name+" has played their cards. Still waiting on others to play theirs");
    }
}