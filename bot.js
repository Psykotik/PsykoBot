const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const request = require('request');


const loc = config.language + '.json';
const lang = require('./locale/' + loc);

const prefix = config.prefix;

console.log(getTime() + " Bot is starting");
client.on('ready', () => {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var ms = d.getMilliseconds();
  var timestamp = '[' + h + ':' + m + ':' + s + ':' + ms + ']';
  console.log(timestamp + ` Bot has succesfully started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setPresence({ game: { name: 'being created' }, status: 'dnd' })
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
    var ping = Date.now() - message.createdTimestamp;
    console.log(getTime() + " Ping command : " + ping + "ms");
    message.channel.send(lang.ping + ' `' + ping + ' ms`');
  }

  //
  // Invitation command
  // TODO: Refactoring invite link
  //
  else if (message.content.startsWith(prefix + 'invite')) {
    console.log(getTime() + " Invite command");
    message.channel.send(lang.invite + 'https://discordapp.com/oauth2/authorize?&client_id=363812923530805248&scope=bot&permissions=8');
  }

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

    console.log(getTime() + " Fetching iLVL for " + Player + " on server " + Realm + " ( " + Region + " )");

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
            title: "There's is the requested Player information",
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
  else if (message.content.startsWith(prefix + 'a')) {

    var commandcut = message.content.substr(",a ".length); //cut "!bot " off of the start of the command
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
      message.channel.send("Hey, please use the command like this : ```,apex PLATFORM-PLAYER```"); // send arguments into message's channel
      return ("error");

    }

    // Platform = "pc";
    // Player = "iPsykotik";

    var apiLink = "https://apextab.com/api/search.php?platform=" + Platform + "&search=" + Player;

    console.log(getTime() + " Executing the request " + apiLink);


    //First API Call to get AID
    request(apiLink, function (error, response, body) {

      if (error) {
        return console.error(error);
      }

      let json = body;
      var parsedJson = JSON.parse(json);
      console.log(parsedJson);
      if (parsedJson.hasOwnProperty('results')) {

        var aid = parsedJson.results[0].aid;
        console.log(aid);
      } else {
        message.channel.send("Hey, the user " + Player + " doesn't exists"); // send arguments into message's channel
        return ("error");
      }

      var apiLink2 = "https://apextab.com/api/player.php?aid=" + aid;

      //Second API Call for stats
      console.log(getTime() + " Executing the request " + apiLink2);

      request(apiLink2, function (error, response, body) {

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
                name: parsedJson.name + " statistics"
              },
              title: "There's is the requested Player information",
              fields: [{
                name: "Platform",
                value: parsedJson.platform
              },
              {
                name: "Best legend",
                value: parsedJson.legend
              },
              {
                name: "Level",
                value: parsedJson.level
              }
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: "Psykobot ©"
              }
            }
          });
        }

      })

    });


    // request(apiLink2, (error, response, body) => {
    // if (error) {
    //     return console.error(error);
    // }
    // The API key should be added to config.json
    // request({
    //   headers: {
    //     'TRN-Api-Key': '8cd4a0c5-2599-442c-a362-38bd3d8caf34'
    //   },
    //   uri: apiLink2,
    //   method: 'GET'
    // }, function (err, res, body) {
    //   //it works!
    //   let json = body;
    //   var parsedJson = JSON.parse(json); 
    //   console.log(parsedJson);
    // });

    // let json = body;
    // var parsedJson = JSON.parse(json);    

    // })

  }

  else if (message.content.startsWith(prefix + 'vdm')) {
    const regex = /<p class=\"block hidden-xs\">\n<a href=\".*\">\n(.*) VDM/
    request('https://www.viedemerde.fr/aleatoire', (error, response, body) => {
      if (error) {
        return console.error(error);
      }
      let vdm = regex.exec(body);
      message.channel.send(vdm[1]);
    })
    console.log(getTime() + " VDM api call");


  }

  //
  // Help command
  // TODO: All 🙃
  //
  else if (message.content.startsWith(prefix + 'help')) {
    message.channel.send(lang.help);
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

function getTime() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var ms = d.getMilliseconds();
  var timestamp = '[' + h + ':' + m + ':' + s + ':' + ms + ']';
  return timestamp;
}

// External file for token + bot login. Should be the last line
client.login(config.token);
