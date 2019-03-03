// worldOfWarcraft.js
// ========

const tools = require('./tools');

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
    bar: function () {
        // whatever
    }
};