'use strict';
var request = require('request');
var parseString = require('xml2js').parseString;
var crypto = require('crypto');
var util = require('util');
var debug = require('debug')('GLaDOS:script:hash');

module.exports = function (irc) {
    irc.command('md5', function (event) {
        if (event.params.length > 0) {
            var sum = crypto.createHash('md5');
            sum.update(event.text, 'utf8');
            event.channel.reply(event.user, sum.digest('hex'));
        } else {
            event.user.notice('Use: !md5 <string>');
        }
    });
    irc.command('sha', function (event) {
        if (event.params.length > 0) {
            var sum = crypto.createHash('sha');
            sum.update(event.text, 'utf8');
            event.channel.reply(event.user, sum.digest('hex'));
        } else {
            event.user.notice('Use: !sha <string>');
        }
    });
    irc.command('sha1', function (event) {
        if (event.params.length > 0) {
            var sum = crypto.createHash('sha1');
            sum.update(event.text, 'utf8');
            event.channel.reply(event.user, sum.digest('hex'));
        } else {
            event.user.notice('Use: !sha1 <string>');
        }
    });
    irc.command('sha256', function (event) {
        if (event.params.length > 0) {
            var sum = crypto.createHash('sha256');
            sum.update(event.text, 'utf8');
            event.channel.reply(event.user, sum.digest('hex'));
        } else {
            event.user.notice('Use: !sha256 <string>');
        }
    });
    irc.command('sha512', function (event) {
        if (event.params.length > 0) {
            var sum = crypto.createHash('sha512');
            sum.update(event.text, 'utf8');
            event.channel.reply(event.user, sum.digest('hex'));
        } else {
            event.user.notice('Use: !sha512 <string>');
        }
    });
    irc.command('rmd160', function (event) {
        if (event.params.length > 0) {
            var sum = crypto.createHash('rmd160');
            sum.update(event.text, 'utf8');
            event.channel.reply(event.user, sum.digest('hex'));
        } else {
            event.user.notice('Use: !rmd160 <string>');
        }
    });
    irc.command('md5lookup', function (event) {
        if (event.params.length > 0) {
            request({
                "uri": 'http://md5.noisette.ch/md5.php?hash=' + encodeURIComponent(event.text),
                "headers": {
                    "User-Agent": irc.config.userAgent
                }
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    parseString(body, function (err, data) {
                        if (data.md5lookup.error) {
                            event.channel.reply(event.user, data.md5lookup.error[0]);
                        } else {
                            event.channel.reply(event.user, data.md5lookup.string[0]);
                        }
                    });
                } else {
                    event.channel.reply(event.user, 'Gratz. You broke it. (' + error + ')');
                    debug('%s', error);
                }
            });
        } else {
            event.user.notice('Use: !md5lookup <md5 hash>');
        }
    });
};