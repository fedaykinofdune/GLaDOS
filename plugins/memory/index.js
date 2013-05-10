module.exports = {
    /*==========[ +INFO+ ]==========*/
    info: {
        description: "Zeigt die aktuelle Speicherausnutzung an.",
        commands: ["{C}memory"]
    },
    /*==========[ -INFO- ]==========*/

    onCommand: function(client, server, channel, commandChar, name, params, user, text, message) {
        if(name == "memory" && user.hasPermissions()) {
            var mem = process.memoryUsage();
            client.notice(user.getNick(), UTIL.readableNumber(mem.rss) + " (v8: " + UTIL.readableNumber(mem.heapUsed) + " / " + UTIL.readableNumber(mem.heapTotal) + ")");
            return true;
        }
    }
};