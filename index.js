const Discord = require('discord.js');
const prefix = '|';
const client = new Discord.Client();
const token = 'ODc5ODI0ODcyNTc3MDQwNDg2.YSVWww.8DEf0jNyjSTILvIUq8l1gAVi6XU';
var cmd;

client.on('message', message=>{
    var msg = message.content;
    var author = message.author
    if(msg.startsWith(prefix, 0)){
        console.log("yes prefix");
        cmd = message.content.slice(prefix.length).trim();

        try{
            var commandFile = require(`./commands/${cmd}.js`);
            commandFile.run(client, message, args);
        } catch(e){
            console.log(e.content);
        } finally{
            console.log("command completed");
        }
    }
    
})


client.login(token);
client.on('ready', () => {   
    console.log('The bot is ready'); 
    
});
