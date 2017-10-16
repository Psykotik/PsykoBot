const Discord = require('discord.js');
const client = new Discord.Client();
var auth = require('./auth.json');


client.on('ready', () => {
  console.log('Je suis pret!');
});

var prefix = ",";

client.on('message', message => {

  //
  // Ping feature, should break at any time, no real value but fastest way to
  // check if bot is online AND operational
  //
  if (message.content.startsWith(prefix + 'ping')) {
    message.channel.send('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
  }

  //
  // Invitation command
  // TODO: Refactoring invite link
  //
  else if (message.content.startsWith(prefix + 'invite')) {
    message.channel.send('Hey ! Invite me with https://discordapp.com/oauth2/authorize?&client_id=363812923530805248&scope=bot&permissions=8');
  }

  //
  // Help command
  // TODO: All 🙃
  //
  else if (message.content.startsWith(prefix + 'help')) {
    message.channel.send('Kappa no time to spend on this bullshit atm ! 🙃');
  }
});

// External file for token + bot login. Should be the last line
client.login(auth.token);
