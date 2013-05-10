module.exports = {
    /*==========[ +INFO+ ]==========*/
    info: {
        description: "Postet die Wikipedia Definition eines Begriffes im Channel.",
        commands: ["{C}wikipedia <Text>", "{C}wiki <Text>"]
    },
    /*==========[ -INFO- ]==========*/

    onCommand: function(client, server, channel, commandChar, name, params, user, text, message) {
        if(name == "wiki" || name == "wikipedia") {
            if( params.length === 0 ) return client.notice(user.getNick(), commandChar + name + " <Text>");
            var url = "https://de.wikipedia.org/w/index.php?title="+encodeURIComponent(text) + "&redirect=no";
            REQUEST(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if(/Diese Seite existiert nicht/.test(body)) {
                        client.say(channel.getName(), user.getNick() + ": Wikipedia weiss nicht was du suchst.");
                    }
                    else {
                        var $ = CHEERIO.load(body);

                        if($('#contentSub').text().length > 0) {
                            client.say(channel.getName(), user.getNick() + ": Wikipedia weiss nicht was du suchst.");
                        }
                        else {
                            var p = $('p').first().text();
                            p = p.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s*\[.*?\]\s*/g, ' ');
                            client.say(channel.getName(), user.getNick() + ": " + p);
                        }
                    }
                }
                else if (!error && response.statusCode == 404) {
                     client.say(channel.getName(), user.getNick() + ": Wikipedia weiss nicht was du suchst.");
                }
            });
            return true;
        }
    }
};