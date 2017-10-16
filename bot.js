const Discord = require('discord.js');
const client = new Discord.Client();
var config = require('./config.json');


client.on('ready', () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setGame(`┬─┬﻿ ノ( ゜-゜ノ)`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

var prefix = config.prefix;

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
  //
  // Role command
  // TODO: Add arg to check wanted role (useless atm, checking only a test role, shouldn't be hardcoded)
  //
  else if (message.content.startsWith(prefix + 'role')) {

    let myRole = message.guild.roles.find("name", "test");
    let member = message.member;
    let membersWithRole = message.guild.roles.get(myRole.id).members;

    message.channel.send(`Got ${membersWithRole.size} members with that role. ` + member + ` sent this request !`);

    member.addRole(myRole).catch(console.error);

    message.channel.send(`Adding role !`);

    if (message.member.roles.has(myRole.id)) {
      message.channel.send(`Yay, the author of the message has the role!`);
    } else {
      message.channel.send(`Nope, noppers, nadda.`);
    }
  }
  //
  // Suicide command
  // Suicide yourself _ON DISCORD_ in the easiest way you have ever seen (should be takken as a joke, really)
  //
  else if (message.content.startsWith(prefix + 'suicide')) {
    try {
      // Easy way to get member object though mentions.
      var member = message.member;

      // Kick
      member.kick().then((member) => {
        // Successmessage
        message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
      }).catch(() => {
        // Failmessage
        message.channel.send("Access Denied");
      });
    } catch (e) {
      message.channel.send('Unable to kick someone.');
    }
  }

  //
  // Roulette russe command
  // Generate a random number, and if it's 1, kick the user. (1/4 chance to be kicked by default)
  //
  else if (message.content.startsWith(prefix + 'roulette russe') || message.content.startsWith(prefix + 'rr')) {

    message.channel.send('Wow such ballzy guy comin\' here ! 😃');

    setTimeout(function() {
      message.channel.send('Ready to face the Evil himself ? Really ??')
        .then(function(message) {
          message.react("😈")
        }).catch(function() {
          console.log("There's an error while react the roulette russe");
        });;
    }, 200);

    setTimeout(function() {
      var random = Math.floor((Math.random() * 6) + 1);
      if (random == 1) {
        message.channel.send("U DED");

        setTimeout(function() {
          try {
            // Easy way to get member object though mentions.
            var member = message.member;

            // Kick
            member.kick().then((member) => {
              // Successmessage
              message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
            }).catch(() => {
              // Failmessage
              message.channel.send("Access Denied");
            });
          } catch (e) {
            message.channel.send('Unable to kick someone.');
          }
        }, 3300);


      } else {
        message.channel.send("Pfew what a prank, there's no bullet this time.");
      }
    }, 500);
  }
});

// External file for token + bot login. Should be the last line
client.login(config.token);
