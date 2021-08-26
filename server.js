const Discord = require('discord.js');
const intents = require('discord.js');
const auth = require('./auth.json');
const prefix = '|';
const client = new Discord.Client({intents: ['DIRECT_MESSAGES']});
var cmd;




client.login(token);
client.on('ready', () => {   
    console.log('The bot is ready'); 
    
});

client.on('message', message => {
    console.log("message sensed");
    var msg = message.content;
    var author = message.author
    if(msg.startsWith(prefix, 0)){
        console.log("yes prefix");
        cmd = message.content.slice(prefix.length).trim();

        try{
            var commandFile = require(`./commands/${cmd}.js`);
            commandFile.run(client, msg, cmd);
        } catch(e){
            
        } finally{
            console.log("command completed");
        }
    }
    
});