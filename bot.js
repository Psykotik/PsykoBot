const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const request = require('request');


const loc = config.language + '.json';
const lang = require('./locale/' + loc);

const prefix = config.prefix;


client.on('ready', () => {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var ms = d.getMilliseconds();
  var timestamp = '[' + h + ':' + m + ':' + s + ':' + ms + ']' ;
  console.log( timestamp + ` Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
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
    message.channel.send(lang.ping + ' `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    //message.author.send(lang.ping + ' `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    //console.log(`Ping command : ` + message.author);

  }

  //
  // Invitation command
  // TODO: Refactoring invite link
  //
  else if (message.content.startsWith(prefix + 'invite')) {
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
  else if (message.content.startsWith(prefix + 'apex')) {
    
    var commandcut = message.content.substr(",apex ".length); //cut "!bot " off of the start of the command
    var msg = ""; //create message variable
    var argumentarray = commandcut.split("-"); // split array by "," characters
    argumentarray.forEach(function(element) { // foreach argument given
      msg += element + " "; // add argument and space to message
    }, this);

    var Platform = argumentarray[0];
    var Player = argumentarray[1];
    
    if(Platform == null || Platform == '' || Player == null|| Platform == '') {
      Platform = "0";
      Player = "0";

      message.channel.send("Hey, please use the command like this : ```,apex PLATFORM-PLAYER```"); // send arguments into message's channel
   }

    var apiLink2 = "https://apextab.com/api/search.php?platform=pc&search=iPsykotik";
    var apiLink = "https://public-api.tracker.gg/apex/v1/standard/profile/" + Platform + "/" + Player ;

    console.log(getTime() + " Executing the request https://public-api.tracker.gg/apex/v1/standard/profile/" + Platform + "/" + Player);


    request(apiLink2, (error, response, body) => {
    if (error) {
        return console.error(error);
    }
    // The API key should be added to config.json
    request({
      headers: {
        'TRN-Api-Key': '8cd4a0c5-2599-442c-a362-38bd3d8caf34'
      },
      uri: apiLink2,
      method: 'GET'
    }, function (err, res, body) {
      //it works!
      let json = body;
      var parsedJson = JSON.parse(json); 
      console.log(parsedJson);
    });

    let json = body;
    var parsedJson = JSON.parse(json);    

    })
  
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

    setTimeout(function () {
      message.channel.send(lang.intro2)
        .then(function (message) {
          message.react("😈")
        }).catch(function () {
          console.log(lang.error);
        });;
    }, 200);

    setTimeout(function () {
      var random = Math.floor((Math.random() * 6) + 1);
      if (random == 1) {
        message.channel.send(lang.rr_success);

        setTimeout(function () {
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
    var formatted_reason = ` ${kickedMemberName} kicked by ${kickerName}. Roles was ${member.user._roles}. Reason :` + reason;

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

function getTime(){
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var ms = d.getMilliseconds();
  var timestamp = '[' + h + ':' + m + ':' + s + ':' + ms + ']' ;
  return timestamp;
}

// External file for token + bot login. Should be the last line
client.login(config.token);
