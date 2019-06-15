// worldOfWarcraft.js
// ========

const tools = require('./tools');
const Discord = require('discord.js');


const request = require('request');

module.exports = {
    ilvl: function (Player, Realm, Region, avatarUrl) {

        var apiLink = "https://raider.io/api/v1/characters/profile?region=" + Region + "&realm=" + Realm + "&name=" + Player + "&fields=gear"
        console.log(tools.getTime() + " Fetching iLVL for " + Player + " on server " + Realm + " ( " + Region + " )");

        request(apiLink, (error, response, body) => {
            if (error) {
                return console.error(error);
            }
            let json = body;
            var parsedJson = JSON.parse(json);
            //console.log(parsedJson);


            if (parsedJson.hasOwnProperty('name')) {
                embed = {
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
                            icon_url: avatarUrl,
                            text: "Psykobot ©"
                        }
                    }
                };
                console.log("toto" + embed);
                return parsedJson.gear.item_level_total;
            }
        })
        return;
    },
    ilvl2: function (Player, Realm, Region) {

        var options = {
            url: "https://raider.io/api/v1/characters/profile?region=" + Region + "&realm=" + Realm + "&name=" + Player + "&fields=gear"
        };

        //var apiLink = "https://raider.io/api/v1/characters/profile?region=" + Region + "&realm=" + Realm + "&name=" + Player + "&fields=gear"
        console.log(tools.getTime() + " Fetching iLVL for " + Player + " on server " + Realm + " ( " + Region + " )");

        return new Promise(function(resolve, reject) {
            // Do async job
            request.get(options, function(err, resp, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body));
                    let json = body;
            var parsedJson = JSON.parse(json);
            //console.log(parsedJson);


            if (parsedJson.hasOwnProperty('name')) {
                var embed = new Discord.RichEmbed()
                    .setTitle("ilvl")
                    .setColor("#CD3333")
                    .setDescription("ilvl2 ")
                    //.setFooter(parsedJson.name + " global rank is " + parsedJson.globalrank, parsedJson.avatar)
                    .setThumbnail("http://51.77.157.113/Psykobot/information.png")
                    .setTimestamp()
                    //.setURL("https://apextab.com/" + parsedJson.aid)
                    .addField("toto")

                return embed;

            }
                }
            })
        })

        /* request(options, (error, response, body) => {
            if (error) {
                return console.error(error);
            }
            let json = body;
            var parsedJson = JSON.parse(json);
            //console.log(parsedJson);


            if (parsedJson.hasOwnProperty('name')) {
                var embed = new Discord.RichEmbed()
                    .setTitle("ilvl")
                    .setColor("#CD3333")
                    .setDescription("ilvl2 ")
                    //.setFooter(parsedJson.name + " global rank is " + parsedJson.globalrank, parsedJson.avatar)
                    .setThumbnail("http://51.77.157.113/Psykobot/information.png")
                    .setTimestamp()
                    //.setURL("https://apextab.com/" + parsedJson.aid)
                    .addField("toto")
                //.addField("Gibraltar", "Matches : **" + parsedJson.matches_Gibraltar + "** Kills : **" + parsedJson.kills_Gibraltar + "** Headshots : **" + parsedJson.headshots_Gibraltar + "** Damages : **" + parsedJson.damage_Gibraltar + "**")
                //.addField("Lifeline", "Matches : **" + parsedJson.matches_Lifeline + "** Kills : **" + parsedJson.kills_Lifeline + "** Headshots : **" + parsedJson.headshots_Lifeline + "** Damages : **" + parsedJson.damage_Lifeline + "**")
                //.addField("Pathfinder", "Matches : **" + parsedJson.matches_Pathfinder + "** Kills : **" + parsedJson.kills_Pathfinder + "** Headshots : **" + parsedJson.headshots_Pathfinder + "** Damages : **" + parsedJson.damage_Pathfinder + "**")
                //.addField("Wraith", "Matches : **" + parsedJson.matches_Wraith + "** Kills : **" + parsedJson.kills_Wraith + "** Headshots : **" + parsedJson.headshots_Wraith + "** Damages : **" + parsedJson.damage_Wraith + "**")
                //.addField("Bangalore", "Matches : **" + parsedJson.matches_Bangalore + "** Kills : **" + parsedJson.kills_Bangalore + "** Headshots : **" + parsedJson.headshots_Bangalore + "** Damages : **" + parsedJson.damage_Bangalore + "**")
                //.addField("Caustic", "Matches : **" + parsedJson.matches_Caustic + "** Kills : **" + parsedJson.kills_Caustic + "** Headshots : **" + parsedJson.headshots_Caustic + "** Damages : **" + parsedJson.damage_Caustic + "**")
                //.addField("Mirage", "Matches : **" + parsedJson.matches_Mirage + "** Kills : **" + parsedJson.kills_Mirage + "** Headshots : **" + parsedJson.headshots_Mirage + "** Damages : **" + parsedJson.damage_Mirage + "**")
                //.addBlankField(true)
                //.addBlankField(true)

                return embed;

            }
        }) */

    },
    bar: function () {
        // whatever
    }
};