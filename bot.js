const Discord = require('discord.js');
const client = new Discord.Client();
var auth = require('./auth.json');


client.on('ready', () => {
  console.log('Je suis pret!');
});

var prefix = ",";

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
  else if (message.content.startsWith(prefix + 'ping')) {
        message.channel.sendMessage('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
  }
});

// External file for token + bot login. Should be the last line
client.login(auth.token);
