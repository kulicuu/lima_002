"use strict";
// const Rx = require('rxjs');
// const Bluebird = require('bluebird');
var Bluebird = require('bluebird');
var IoRedis = require('ioredis');
var Orange = IoRedis.createClient();
var Promise = Bluebird.Promise;
var c = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    console.log.apply(console, args);
};
var base = "../";
var league_002_1 = require('../range__api/league_002');
var game_002_1 = require('../range__api/game_002');
var sunspot = league_002_1.default("league", Orange);
var novaspot = game_002_1.default('game', Orange);
var rpc__api;
var admin_methods_1 = require('../constants/admin_methods');
exports.rpc__api = rpc__api = function (data, cb) {
    c(data.event_type || data.type);
    // if (data.type === 'falcon') {cb('falcon_ack')}
    switch (data.event_type) {
        case admin_methods_1.init_league: {
            sunspot.league_init(data.name, function (res) {
                c("rpc has callback with", res);
                cb(res);
            });
            break;
        }
        case admin_methods_1.init_team: {
        }
        case admin_methods_1.init_season: {
        }
        case admin_methods_1.init_team: {
        }
        case admin_methods_1.init_game: {
        }
        case "aeo": {
        }
        case "LlEAGUE_INVITE_PLAYER": {
        }
        case "LlEAGUE_INIT": {
        }
        case "CONSUMATE_GAME": {
        }
        case "ADD_GAME_TO_SEASON": {
        }
        case "ADD_SEASON_TO_LEAGUE": {
        }
        case "ADD_TEAM_TO_LEAGUE": {
            sunspot.add_team_001(data, function (res) {
                c('rpc has ', res);
                // c('keys in rpc', _.keys(res.res))
                cb(res);
            });
            break;
        }
        case "league_init": {
            sunspot.league_init(data.name, function (res) {
                c("rpc has callback with", res);
                cb(res);
            });
            break;
        }
    }
    ;
};
exports.default = function (message, primus) {
    c('message', message);
    var counter = 0;
    // to start with we'll just let anyone have rights to do st
    primus.on('connection', function (spark) {
        c('Primus has connection spark', spark);
        spark.on('data', function (data) {
            rpc__api(data, function (res) {
                primus.write(res);
            });
        });
    });
    setInterval(function () {
        counter++;
        primus.write({ stuff: "stuff of hey yeah this is a primus write " + counter });
    }, 7000);
    return 393939;
};
