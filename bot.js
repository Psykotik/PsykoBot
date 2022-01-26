const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

const config = require('./config.json');
const request = require('request');

// Bot's requirement
const tools = require('./src/tools');
const adminCmds = require('./src/adminCmds');
const apex = require('./src/apexLegends');
const wow = require('./src/worldOfWarcraft');

const loc = config.language + '.json';
const lang = require('./locale/' + loc);

const prefix = config.prefix;

tools.createLogFile(tools.getTime() + " Bot is starting");
tools.logBoot(); // Logging the boot time

client.on('ready', () => {
  tools.appendLogFile(tools.getTime() + ` Bot has succesfully started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setPresence({ game: { name: 'being created' }, status: 'dnd' });
});

client.on('disconnected', function () {
  tools.appendLogFile('Disconnected from Discord API Service. Attempting to reconnected...');
});

//Warnings from Discord.js
client.on('warn', function (msg) {
  tools.appendLogFile(msg);
});

client.on('error', function (err) {
  tools.appendLogFile(err.message);
  process.exit(1);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  tools.appendLogFile(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  tools.appendLogFile(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on('message', message => {
  // Split message with args.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

  //
  // Ping feature, should break at any time, no real value but fastest way to
  // check if bot is online AND operational
  //
  if (message.content.startsWith(prefix + 'ping'))
    message.channel.send(lang.ping + ' `' + adminCmds.ping(message.createdTimestamp) + ' ms`');
  else if (message.content.startsWith(prefix + 'uptime'))
    message.channel.send(adminCmds.uptime(client.uptime));
  else if (message.content.startsWith(prefix + 'invite'))
    message.channel.send(adminCmds.invite());

  else if (message.content.startsWith(prefix + 'ilvl')) {

    var commandcut = message.content.substr(",ilvl ".length); //cut "!bot " off of the start of the command
    var msg = ""; //create message variable
    var argumentarray = commandcut.split("-"); // split array by "," characters
    argumentarray.forEach(function (element) { // foreach argument given
      msg += element + " "; // add argument and space to message
    }, this);

    var Player = argumentarray[0];
    var Realm = argumentarray[1];
    var Region = argumentarray[2];

    
    var initializePromise = wow.ilvl2(Player, Realm, Region, 4);
    initializePromise.then(function (result) {
      userDetails = result;
      var color;

      var initializePromiseColor = wow.getColor(userDetails.mythic_plus_scores.all);
      initializePromiseColor.then(function (result) {
        var color=result;
      })
      //console.log("Initialized user details");
      // Use user details from here
      //console.log(userDetails)

      if (userDetails.hasOwnProperty('name')) {
        var embed = new Discord.RichEmbed()
          .setTitle(userDetails.name + "'s informations (" + userDetails.race + " " + userDetails.active_spec_name + " " + userDetails.class + ")")
          .setColor(color)
          .addField("Raider.io score ", userDetails.mythic_plus_scores.all, false)
          .addField("Raider.io overall Mythic+ rank", "World : " + userDetails.mythic_plus_ranks.overall.world + "\n Region : " + userDetails.mythic_plus_ranks.overall.region + " \nRealm : " + userDetails.mythic_plus_ranks.overall.realm, true)
          .addField("Raider.io class Mythic+ rank", "World : " + userDetails.mythic_plus_ranks.class.world + "\n Region : " + userDetails.mythic_plus_ranks.class.region + "\n Realm : " + userDetails.mythic_plus_ranks.class.realm, true)
          .addBlankField()
          .addField(userDetails.mythic_plus_recent_runs[0].dungeon + " +" + userDetails.mythic_plus_recent_runs[0].mythic_level + " (+" + userDetails.mythic_plus_recent_runs[0].num_keystone_upgrades + ")",
            "Score : " + userDetails.mythic_plus_recent_runs[0].score +
            "\n Affixs :" + " [" + userDetails.mythic_plus_recent_runs[0].affixes[0].name + "](" + userDetails.mythic_plus_recent_runs[0].affixes[0].wowhead_url + ")" + ", [" + userDetails.mythic_plus_recent_runs[0].affixes[1].name + "](" + userDetails.mythic_plus_recent_runs[0].affixes[1].wowhead_url + ")" + ", [" + userDetails.mythic_plus_recent_runs[0].affixes[2].name + "](" + userDetails.mythic_plus_recent_runs[0].affixes[2].wowhead_url + ")" + ", [" + userDetails.mythic_plus_recent_runs[0].affixes[3].name + "](" + userDetails.mythic_plus_recent_runs[0].affixes[3].wowhead_url + ")\n", true)
          
            .addField(userDetails.mythic_plus_recent_runs[1].dungeon + " +" + userDetails.mythic_plus_recent_runs[1].mythic_level + " (+" + userDetails.mythic_plus_recent_runs[1].num_keystone_upgrades + ")",
            "Score : " + userDetails.mythic_plus_recent_runs[1].score +
            "\n Affixs :" + " [" + userDetails.mythic_plus_recent_runs[1].affixes[0].name + "](" + userDetails.mythic_plus_recent_runs[1].affixes[0].wowhead_url + ")" + ", [" + userDetails.mythic_plus_recent_runs[1].affixes[1].name + "](" + userDetails.mythic_plus_recent_runs[1].affixes[1].wowhead_url + ")" + ", [" + userDetails.mythic_plus_recent_runs[1].affixes[2].name + "](" + userDetails.mythic_plus_recent_runs[1].affixes[2].wowhead_url + ")" + ", [" + userDetails.mythic_plus_recent_runs[1].affixes[3].name + "](" + userDetails.mythic_plus_recent_runs[1].affixes[3].wowhead_url + ")\n", true)
          .addField(userDetails.mythic_plus_recent_runs[2].dungeon + " +" + userDetails.mythic_plus_recent_runs[2].mythic_level + " (+" + userDetails.mythic_plus_recent_runs[2].num_keystone_upgrades + ")",
            "Score : " + userDetails.mythic_plus_recent_runs[2].score +
            "\n Affixs :" + " [" + userDetails.mythic_plus_recent_runs[2].affixes[0].name + "](" + userDetails.mythic_plus_recent_runs[2].affixes[0].wowhead_url + ")" + ", [" + userDetails.mythic_plus_recent_runs[2].affixes[1].name + "](" + userDetails.mythic_plus_recent_runs[2].affixes[1].wowhead_url + ")" + ", [" + userDetails.mythic_plus_recent_runs[2].affixes[2].name + "](" + userDetails.mythic_plus_recent_runs[2].affixes[2].wowhead_url + ")" + ", [" + userDetails.mythic_plus_recent_runs[2].affixes[3].name + "](" + userDetails.mythic_plus_recent_runs[2].affixes[3].wowhead_url + ")\n", true)
          .setThumbnail(userDetails.thumbnail_url)
          .setTimestamp()
          .setURL(userDetails.profile_url)
        message.channel.send(embed)
        return embed;

      }
    }, function (err) {
      console.log(err);
    })
  }
});


// External file for token + bot login. Should be the last line
client.login(token);





