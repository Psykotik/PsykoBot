const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const loc = config.language + '.json';
const lang = require('./locale/' + loc);

const prefix = config.prefix;


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



client.on('message', message => {

  // Split message with args.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);


  //
  // Ping feature, should break at any time, no real value but fastest way to
  // check if bot is online AND operational
  //
  if (message.content.startsWith(prefix + 'ping')) {
    message.channel.send(lang.ping + ' `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    message.author.send(lang.ping + ' `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    console.log(`Ping command : ` + message.author);

  }

  //
  // Invitation command
  // TODO: Refactoring invite link
  //
  else if (message.content.startsWith(prefix + 'invite')) {
    message.channel.send(lang.invite + 'https://discordapp.com/oauth2/authorize?&client_id=363812923530805248&scope=bot&permissions=8');
  }

  //
  // Help command
  // TODO: All 🙃
  //
  else if (message.content.startsWith(prefix + 'help')) {
    message.channel.send(lang.help);
  }
  //
  // Role command
  // TODO: Add arg to check wanted role (useless atm, checking only a test role, shouldn't be hardcoded) + Add needed permissions to use the command
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
        message.channel.send(":wave: " + member.displayName + " " + lang.suicide);
      }).catch(() => {
        // Failmessage
        message.channel.send(lang.access_denied);
      });
    } catch (e) {
      message.channel.send(lang.unable_to_kick);
    }
  }

  //
  // Roulette russe command
  // Generate a random number, and if it's 1, kick the user. (1/4 chance to be kicked by default)
  //
  else if (message.content.startsWith(prefix + 'roulette russe') || message.content.startsWith(prefix + 'rr')) {

    message.channel.send(lang.intro);

    setTimeout(function() {
      message.channel.send(lang.intro2)
        .then(function(message) {
          message.react("😈")
        }).catch(function() {
          console.log(lang.error);
        });;
    }, 200);

    setTimeout(function() {
      var random = Math.floor((Math.random() * 6) + 1);
      if (random == 1) {
        message.channel.send(lang.rr_success);

        setTimeout(function() {
          try {
            // Easy way to get member object though mentions.
            var member = message.member;

            // Kick
            member.kick().then((member) => {
              // Successmessage
              message.channel.send(":wave: " + member.displayName + " " + lang.suicide);
            }).catch(() => {
              // Failmessage
              message.channel.send(lang.access_denied);
            });
          } catch (e) {
            message.channel.send(lang.unable_to_kick);
          }
        }, 3300);


      } else {
        message.channel.send(lang.rr_fail);
      }
    }, 500);
  }

  //
  // Fire command
  // Fire a bullet and kick someone
  // TODO: Log the one who fired the bullet + aim precision + roles the fired got before being kicked
  //
  else if (message.content.startsWith(prefix + 'fire')) {

    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit:
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if (!message.member.roles.some(r => ["Administrator", "Adminzer", "Le Roi Chien"].includes(r.name)))
      return message.reply(lang.fire_error);

    message.channel.send(lang.gimme + " " + lang.sniper);

    message.channel.send(lang.fire_hit);


    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if (!member)
      return message.reply(lang.error_unvalidUser);
    if (!member.kickable)
      return message.reply(lang.error_higherRank);

    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if (!reason)
      return message.reply(lang.error_kickReason);

    var kickedMemberName = member.user.tag;
    var kickerName = message.author.username;
    var formatted_reason = ` ${kickedMemberName} kicked by ${kickerName}. Roles was ${member.user._roles}. Reason :` +reason;

    // Now, time for a swift kick in the nuts!
    member.kick(formatted_reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${kickedMemberName} ` + lang.kick_message + ` ${kickerName}: ${reason}`);

  }

  //
  // Automatic response, nothing inportant here
  //
  else if (message.content.startsWith(lang.tableflip)) {
    message.channel.send(lang.unfliptable);
  } else if (message.content.startsWith(lang.unfliptable)) {
    message.channel.send(lang.good_boy);
  } else if (message.content.startsWith('shrug') || message.content.startsWith('/shrug')) {
    message.channel.send(lang.shrug);
  }
});

// External file for token + bot login. Should be the last line
client.login(config.token);
