const { SlashCommandChannelOption } = require('@discordjs/builders');
const Discord = require('discord.js'); 
const client = new Discord.Client();
const apiFM = "22df4bf82525784ac8e983c4e67379a0";
const lastURL = 'http://ws.audioscrobbler.com/2.0';
const topTracks = 'http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=rj&api_key=22df4bf82525784ac8e983c4e67379a0';

var cache = new LastFMCache();
const API = require('last.fm.api'),
    api = new API({
    apiKey : '22df4bf82525784ac8e983c4e67379a0',
    apiSecret : 'ec7925c3b2d1f2936f56bf5a30c23f0b'
});

client.login('token');
client.on('ready', () => {   
    console.log('The bot is ready'); 
    
});

fetch(lastURL+topTracks)
.then(response=>{
    return response.json;
})
.then()