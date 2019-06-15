// adminCmds.js
// ========
const tools = require('./tools');
const Discord = require('discord.js');

module.exports = {
    uptime: function (uptimeTime) {
        /*let totalSeconds = (uptimeTime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.round(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        return uptime; */

        function format(seconds) {
            function pad(s) {
                return (s < 10 ? '0' : '') + s;
            }
            var days = Math.floor(seconds / 86400);
            var hours = Math.floor(seconds / (60 * 60));
            var minutes = Math.floor(seconds % (60 * 60) / 60);
            var seconds = Math.floor(seconds % 60);

            return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        }


        function embedFormat(message) {

            var embed = new Discord.RichEmbed()
            .setTitle("Uptime")
            .setColor("#CD3333")
            .setDescription("Psykobot has started since " + message)
            .setThumbnail("http://51.77.157.113/Psykobot/information.png")
            .setTimestamp()
           //.addField("Uptime : " + message)
            //.addBlankField(true)
            //.addBlankField(true)

            return embed;
        }

        var uptime = process.uptime();
        tools.appendLogFile(tools.getTime() + " Uptime call (" + format(uptime) + ")");

        return embedFormat(format(uptime));
    },
    ping: function (time) {
        var ping = Date.now() - time;
        tools.appendLogFile(tools.getTime() + " Ping command : " + ping + "ms");
        return ping;
    },
    invite: function () {
        tools.appendLogFile(tools.getTime() + " Invite command");
        var inviteLink = "https://discordapp.com/oauth2/authorize?&client_id=363812923530805248&scope=bot&permissions=134736960";
        return inviteLink;
    }
};