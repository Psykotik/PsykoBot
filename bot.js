const Discord = require('discord.js');
const client = new Discord.Client();
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

console.log(tools.getTime() + " Bot is starting");

client.on('ready', () => {
  console.log(tools.getTime() + ` Bot has succesfully started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setPresence({ game: { name: 'being created' }, status: 'dnd' })
});

client.on('disconnected', function() {
  console.log('Disconnected from Discord API Service. Attempting to reconnected...');
});

//Warnings from Discord.js
client.on('warn', function(msg) {
  console.log(msg);
});

client.on('error', function(err) {
  console.log(err.message);
  process.exit(1);
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

    
    

    var apiLink = "https://raider.io/api/v1/characters/profile?region=" + Region + "&realm=" + Realm + "&name=" + Player + "&fields=gear"

    message.channel.send("Hey, i'm fetching the ilvl for " + Player + " on server " + Realm + " ( " + Region + " )"); // send arguments into message's channel

    console.log(tools.getTime() + " Fetching iLVL for " + Player + " on server " + Realm + " ( " + Region + " )");

    //console.log(wow.ilvl(Player, Realm, Region, client.user.avatarURL));
/*     tools.sleep(3000);
    console.log(embed);
    message.channel.send(embed); */

    request(apiLink, (error, response, body) => {
      if (error) {
        return console.error(error);
      }
      let json = body;
      var parsedJson = JSON.parse(json);
      console.log(parsedJson);


      if (parsedJson.hasOwnProperty('name')) {
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: parsedJson.name + " informations"
            },
            title: parsedJson.name + " " + "( " + parsedJson.race + " ) " + parsedJson.class + " " + parsedJson.active_spec_name + " " + parsedJson.faction + "" + "",
            fields: [{
              name: "iLvl (equipped)",
              value: parsedJson.gear.item_level_equipped
            },
            {
              name: "iLvl (total)",
              value: parsedJson.gear.item_level_total
            }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Psykobot ©"
            }
          }
        });
      } else {
        message.channel.send("The player " + Player + " wasn't found. Please check syntax.")
        message.channel.send("The correct syntax is :\n**" + prefix + "ilvl PLAYER-REALM-REGION** \nExample: **,ilvl Khìjazi-Illidan-EU**")
      }




    })



    /* message.channel.send({embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "This is an embed",
      url: "http://google.com",
      description: "This is a test embed to showcase what they look like and what they can do.",
      fields: [{
          name: "Fields",
          value: "They can have different fields with small headlines."
        },
        {
          name: "Masked links",
          value: "You can put [masked links](http://google.com) inside of rich embeds."
        },
        {
          name: "Markdown",
          value: "You can put all the *usual* **__Markdown__** inside of them."
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Example"
      }
    }
  }); */

  }

  //
  // Apex Legends
  // TODO: 
  //
  else if (message.content.startsWith(prefix + 'apex')) {

    var commandcut = message.content.substr(",apex ".length); //cut "!bot " off of the start of the command
    var msg = ""; //create message variable
    var argumentarray = commandcut.split("-"); // split array by "," characters
    argumentarray.forEach(function (element) { // foreach argument given
      msg += element + " "; // add argument and space to message
    }, this);

    var Platform = argumentarray[0];
    var Player = argumentarray[1];

    if (Platform == null || Platform == '' || Player == null || Platform == '') {
      Platform = "0";
      Player = "0";
      message.channel.send({
        embed: {
          color: 13447987,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: "Use of apex command",
          description: "Please use the apex command with the following syntax : ```,apex PLATFORM-PLAYER```",
          fields: [{
            name: "Note",
            value: "You have to follow the instructions below in case you can't retrieve your stats."
          },
          {
            name: "Cannot find your profile?",
            value: "In order for you to see your stats on ApexTab, your banner tracker must include your kills."
          },
          {
            name: "Why only kills are displayed?",
            value: "For us to track your headshots and matches, you must add them to your banner as well."
          }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: ""
          }
        }
      }
      );
      return ("error");

    }

    var apiLink = "https://apextab.com/api/search.php?platform=" + Platform + "&search=" + Player;

    console.log(tools.getTime() + " Executing the request " + apiLink);

    //First API Call to get AID
    request(apiLink, function (error, response, body) {

      if (error) {
        return console.error(error);
      }

      var parsedJson = JSON.parse(body);
      if (parsedJson.hasOwnProperty('results')) {
        var aid = parsedJson.results[0].aid;
      } else {
        message.channel.send("Hey, the user " + Player + " doesn't exists"); // send arguments into message's channel
        return ("error");
      }

      var apiLink2 = "https://apextab.com/api/player.php?aid=" + aid;

      //Second API Call for stats
      console.log(tools.getTime() + " Executing the request " + apiLink2);

      request(apiLink2, function (error, response, body) {

        if (error) {
          return console.error(error);
        }
        let json = body;
        var parsedJson = JSON.parse(json);
        //console.log(parsedJson);

        if (parsedJson.hasOwnProperty('name')) {

          // Link for doc : https://anidiots.guide/first-bot/using-embeds-in-messages
          const embed = new Discord.RichEmbed()
            .setTitle(parsedJson.name + " statistics on " + parsedJson.platform)
            .setAuthor("Apex Legends")
            .setColor("#CD3333")
            .setDescription(parsedJson.name + " is level **" + parsedJson.level + "** and has a total of **" + parsedJson.kills + "** kills on **" + parsedJson.matches + "**  matches (KDA : **" + Math.round((parsedJson.kills / parsedJson.matches) * 100) / 100 + "**)")
            .setFooter(parsedJson.name + " global rank is " + parsedJson.globalrank, parsedJson.avatar)
            .setThumbnail("https://logodownload.org/wp-content/uploads/2019/02/apex-legends-logo-3.png")
            .setTimestamp()
            .setURL("https://apextab.com/" + parsedJson.aid)
            .addField("Bloodhound", "Matches : **" + parsedJson.matches_Bloodhound + "** Kills : **" + parsedJson.kills_Bloodhound + "** Headshots : **" + parsedJson.headshots_Bloodhound + "** Damages : **" + parsedJson.damage_Bloodhound + "**")
            .addField("Gibraltar", "Matches : **" + parsedJson.matches_Gibraltar + "** Kills : **" + parsedJson.kills_Gibraltar + "** Headshots : **" + parsedJson.headshots_Gibraltar + "** Damages : **" + parsedJson.damage_Gibraltar + "**")
            .addField("Lifeline", "Matches : **" + parsedJson.matches_Lifeline + "** Kills : **" + parsedJson.kills_Lifeline + "** Headshots : **" + parsedJson.headshots_Lifeline + "** Damages : **" + parsedJson.damage_Lifeline + "**")
            .addField("Pathfinder", "Matches : **" + parsedJson.matches_Pathfinder + "** Kills : **" + parsedJson.kills_Pathfinder + "** Headshots : **" + parsedJson.headshots_Pathfinder + "** Damages : **" + parsedJson.damage_Pathfinder + "**")
            .addField("Wraith", "Matches : **" + parsedJson.matches_Wraith + "** Kills : **" + parsedJson.kills_Wraith + "** Headshots : **" + parsedJson.headshots_Wraith + "** Damages : **" + parsedJson.damage_Wraith + "**")
            .addField("Bangalore", "Matches : **" + parsedJson.matches_Bangalore + "** Kills : **" + parsedJson.kills_Bangalore + "** Headshots : **" + parsedJson.headshots_Bangalore + "** Damages : **" + parsedJson.damage_Bangalore + "**")
            .addField("Caustic", "Matches : **" + parsedJson.matches_Caustic + "** Kills : **" + parsedJson.kills_Caustic + "** Headshots : **" + parsedJson.headshots_Caustic + "** Damages : **" + parsedJson.damage_Caustic + "**")
            .addField("Mirage", "Matches : **" + parsedJson.matches_Mirage + "** Kills : **" + parsedJson.kills_Mirage + "** Headshots : **" + parsedJson.headshots_Mirage + "** Damages : **" + parsedJson.damage_Mirage + "**")
            .addBlankField(true)
            .addBlankField(true)
          message.channel.send({ embed });
        }

      })

    });

  }

  //
  // Automatic response, nothing important here
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





