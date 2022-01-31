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
            url: "https://raider.io/api/v1/characters/profile?region=" + Region + "&realm=" + Realm + "&name=" + Player + "&fields=gear,mythic_plus_scores_by_season,mythic_plus_ranks,mythic_plus_recent_runs,mythic_plus_scores"
        };

        //var apiLink = "https://raider.io/api/v1/characters/profile?region=" + Region + "&realm=" + Realm + "&name=" + Player + "&fields=gear"
        console.log(tools.getTime() + " Fetching iLVL for " + Player + " on server " + Realm + " ( " + Region + " )");

        return new Promise(function (resolve, reject) {
            // Do async job
            request.get(options, function (err, resp, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body));
                    let json = body;
                    var parsedJson = JSON.parse(json);
                    //console.log(parsedJson);


                    if (parsedJson.hasOwnProperty('name')) {
                        var embed = new Discord.MessageEmbed()
                            .setTitle("ilvl")
                            .setColor("#CD3333")
                            .setDescription(parsedJson.achievement_points)
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
    },
    getColor: function (score) {

        var apiLink = "https://raider.io/api/v1/mythic-plus/score-tiers";
        var color = "#FFFFFF";

        return new Promise(function (resolve, reject) {

        

        request(apiLink, (error, response, body) => {
            if (error) {
                return console.error(error);
            }

            if (response.statusCode == 200) {

                let json = body;
                var parsedJson = JSON.parse(json);

                var scoreArray = [];

                for (var i = 0; i < parsedJson.length; i++) {
                    scoreArray.push(parsedJson[i].score);
                }

                for (var i = 0; i < scoreArray.length; i++) {
                    var scoreInArray = scoreArray[i];
                    var scoreInArrayNext = scoreArray[i + 1];

                    if (score < scoreInArray && score > scoreInArrayNext) {
                        color = parsedJson[i].rgbHex;
                    }

                }
                return color;
            }
        })
    })
    }
};
