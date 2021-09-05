var main = require("./playCards");
var black = require("./cardDecks/blackDeck.json");
var white = require("./cardDecks/whiteDeck.json");
var playerHands = [];
var Client;
var playingCards = false;
var currentBlackCard = "";
var currentChannel;
var currentJudge;
var judge;
var orderedSelections = [];
var numCards = 0;

module.exports = {
    getCards: function(){return numCards;},
    getHands: function(){return playerHands;},
    run: (client, message, cmd, words)=>{
        Client = client;
        currentChannel = message.channel;
        judge = Math.floor(Math.random()*playerHands.length);
        generateHands(client);
    },
    doRound: (client)=>{
        canPlay = false;
        var totalMsg = "The selections are in! Here are your choices:\n```";
        for(i=0;i<playerHands.length;i++){
            var msg = currentBlackCard;
            if(!playerHands[i].isJudge){
                msg = msg.replace("__", playerHands[i].playingCards[0]);
                if(numCards == 2){
                    msg = msg.replace("__", playerHands[i].playingCards[1]);
                }
                totalMsg += msg + "\n";
                playerHands.playingCards = [];
                playerHands.hasPlayed = false;
                orderedSelections.push(playerHands[i]);
            }
            
        }
        totalMsg += "```";
        currentChannel.send(totalMsg);
    },
    chooseRoundWinner: (selection)=>{
        var roundWinner = playerHands[selection-1];
        currentChannel.send("The winner of the round is "+roundWinner.name+"!");
        roundWinner.score++;
        if(checkScores()){
            main.endGame();
        }else{
            this.nextRound();
        }
    }

}

exports.vars = {
    playerHands
    
}


// exports.run = (client, message, cmd, words)=>{
//     Client = client;
//     currentChannel = message.channel;
//     judge = Math.floor(Math.random()*playerHands.length);
//     generateHands(client);
    
// }

exports.nextRound = ()=>{
    var card = grabBlack();
    currentJudge = playerHands[judge];
    currentJudge.isJudge = true;
    currentChannel.send("The judge for this round is "+ currentJudge.name+"!\nYour prompt is: ```"+card+"```");
    judge++;
    if(judge == playerHands.length){
        judge = 0;
    }
    currentBlackCard = card;
    canPlay = true;
    if(card.indexOf("__") != -1){
        if((card.match(/__/g)||[]).length == 2){
            //two spaces for white card
            numCards = 2;
            sendHands(Client, 2);
        }else{
            //one space for white card
            numCards = 1;
            sendHands(Client, 1);
        }
    } else{
        //no explicit space for white card ie. a question
        numCards = 1;
        sendHands(Client, 1);
    }
}

// exports.doRound = (client)=>{
//     canPlay = false;
//     var totalMsg = "The selections are in! Here are your choices:\n```";
//     for(i=0;i<playerHands.length;i++){
//         var msg = currentBlackCard;
//         if(!playerHands[i].isJudge){
//             msg = msg.replace('__', playerHands[i].playingCards[0]);
//             console.log(msg.replace("__", playerHands[i].playingCards[0]));
//             if(numCards == 2){
//                 msg = msg.replace("__", playerHands[i].playingCards[1]);
//             }
//             totalMsg += msg + "\n";
//             playerHands.playingCards = [];
//             playerHands.hasPlayed = false;
//             orderedSelections.push(playerHands[i]);
//         }
        
//     }
//     totalMsg += "```";
//     currentChannel.send(totalMsg);
// }

// exports.chooseRoundWinner = (selection)=>{
//     var roundWinner = playerHands[selection];
//     currentChannel.send("The winner of the round is "+roundWinner.name+"!");
//     roundWinner.score++;
//     if(checkScores()){
//         main.endGame();
//     }else{
//         this.nextRound();
//     }
// }

var grabBlack = ()=>{
    var index = Math.floor(Math.random()*black.cards.length);
    var card = black.cards[index];
    console.log(card);
    
    return card;
}

var grabWhite = ()=>{
    var index = Math.floor(Math.random()*white.cards.length);
    var card;
    console.log(index);
    return white.cards[index];
}

var checkScores = ()=>{
    for(i=0;i<playerHands.length;i++){
        if(playerHands[i].score == 5){
            return true;
        }
    }
    return false;
}

var sendHands = (client, num)=>{
    for(i = 0; i < playerHands.length;i++){
        if(!playerHands[i].isJudge){
            console.log(playerHands[i].hand[0]);
        var handString = "You need to play "+num+"cards this round\nTo play cards, type |play and then the numbers of the cards you want to play\nex. |play 3 4```";
        var cardIndex = 1;
        for(j=0;j<playerHands[i].hand.length;j++){
            handString += cardIndex.toString()+". "+playerHands[i].hand[j]+"\n";
            cardIndex++;
        }
        handString += "```"
        Client.users.cache.get(playerHands[i].id).send(handString);
        }
        
        
    }
}

var generateHands=(client)=>{
    console.log(main.vars.playerIDs.length);
    for(i=0;i<main.vars.playerIDs.length;i++){
        var player = {
            name: main.vars.players[i],
            id: main.vars.playerIDs[i],
            hand: [],
            score: 0,
            hasPlayed: false,
            playingCards: [],
            isJudge: false
        };
        for(j = 0; j < 6;j++){
            var card = grabWhite();
            player.hand.push(card);
        }
        playerHands.push(player);
    }
    this.nextRound()
    

    // for(i = 0; i < playerHands.length;i++){
    //     console.log(playerHands[i].hand[0]);
    //     var handString = "```";
    //     var cardIndex = 1;
    //     for(j=0;j<playerHands[i].hand.length;j++){
    //         handString += cardIndex.toString()+". "+playerHands[i].hand[j]+"\n";
    //         cardIndex++;
    //     }
    //     handString += "```"
    //     client.users.cache.get(playerHands[i].id).send(handString);
        
    // }
}