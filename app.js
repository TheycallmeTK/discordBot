var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
//discord dependencies
const { channel } = require('diagnostics_channel');
const Discord = require('discord.js');
const intents = require('discord.js');
const auth = require('./auth.json');
const { userInfo } = require('os');
var prefix = '|';

//discord client initialization
const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_TYPING']});
client.login(auth.token);
client.on('ready', () => {   
    console.log('The bot is ready'); 
    
});

//message and command detection
client.on('messageCreate', (message) => {
    var msg = message.content;
    var author = message.author
    if(msg.startsWith(prefix, 0)){        
        cmd = message.content.slice(prefix.length).trim();
        var words = cmd.split(" ");
        

        try{
            if(cmd.startsWith(auth.adminPrefix)){
                cmd = cmd.slice(adminPrefix.length).trim();
                let commandFile = require(`./commands/admin.js`);
                commandFile.run(client, message, cmd, words);
                
                

                }else{
                    if(cmd.includes("play") && cmd != "playCards"){
                      var c = [];
                      c.push(words[1]);
                      if(words[2]){
                        c.push(words[2]);
                      }
                      let commandFile = require("./commands/play.js");
                      commandFile.run(client,message, c);
                      
                    }
                    else if(cmd.includes("select")){
                      var file = require("./commands/select.js");
                      file.run(client, message, words[1]);

                    }
                    else if(cmd == 'join'){
                      var file = require("./commands/playCards.js");
                      file.addPlayer(client, message, cmd, words);
                    }
                    else if(cmd == 'login'){
                        message.channel.send(redirect_uri);
                    } else{
                        let commandFile = require(`./commands/${cmd}.js`);
                        commandFile.run(client, message, cmd, words);
                    }
                }
            }
            
            
         catch(e){
            console.log(e);
        } finally{
            console.log("command completed");
        }
    }
    
})