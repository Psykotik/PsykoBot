// adminCmds.js
// ========
const tools = require('./tools');

module.exports = {
    uptime: function (uptimeTime) {
        console.log(tools.getTime() + " Uptime call");
        let totalSeconds = (uptimeTime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.round(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        return uptime;
    },
    ping: function (time) {
        var ping = Date.now() - time;
        console.log(tools.getTime() + " Ping command : " + ping + "ms");
        return ping;
    },
    invite: function () {
        console.log(tools.getTime() + " Invite command");
        var inviteLink = "https://discordapp.com/oauth2/authorize?&client_id=363812923530805248&scope=bot&permissions=8";
        return inviteLink;
    }
};