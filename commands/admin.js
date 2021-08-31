exports.run = (client, message, cmd, words)=>{
    if(message.member.permissions.has('ADMINISTRATOR')){
        var command = require(`${cmd}.js`);
        command.run(client, message, cmd, words);
    }else{
        message.channel.send('Woah there, you dont have permission to do that, my friend');
    }
}