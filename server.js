const { channel } = require('diagnostics_channel');
const Discord = require('discord.js');
const intents = require('discord.js');
const auth = require('./auth.json');
const prefix = '|';
const spotify = require("spotify-web-api-js");
const { default: SpotifyWebApi } = require('spotify-web-api-js');
const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_TYPING']});
var cmd;
var spot = new SpotifyWebApi();
spot.setAccessToken(auth.spotifyUserSearchToken);

client.login(auth.token);
client.on('ready', () => {   
    console.log('The bot is ready'); 
    
});

client.on('messageCreate', (message) => {
    console.log("message sensed");
    var msg = message.content;
    var author = message.author
    if(msg.startsWith(prefix, 0)){
        console.log("yes prefix");
        
        cmd = message.content.slice(prefix.length).trim();

        try{
            let commandFile = require(`./commands/${cmd}.js`);
            commandFile.run(client, message, cmd);
        } catch(e){
            console.log(e);
        } finally{
            console.log("command completed");
        }
    }
    
})

