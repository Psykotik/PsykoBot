const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
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

client.login('MzYzODEyOTIzNTMwODA1MjQ4.DLGqsw.aqo8-kR0Pd3qx9iG3OGdZnSR3zU');
