"use strict";
var c = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    console.log.apply(console, arguments);
};
var fs = require('fs');
var _ = require('lodash');
var Bluebird = require('bluebird');
var Promise = Bluebird.Promise;
var uuid = require('node-uuid');
var fS = Promise.promisifyAll(fs);
var path = require('path');
// const base = "../../lua/world_admin/";
// import * as leibniz from '../constants/admin_interfaces_001'
// let interfaces = {}
// _.assign(interfaces, leibniz);
// const i = interfaces;
// import * as aM from  '../constants/admin_methods.ts';
// let zz = fs.readFileSync(path.resolve(__dirname, '../../lua/test.lua'));q
// c('zz', zz.toString());
var api__000 = function (message, Orange) {
    // if this works do them all like this in the sense of trying to get all the protocols standardised
    // single source of truth way.
    // Orange.defineCommand('test', {
    //     lua: fs.readFileSync(path.resolve(__dirname, '../../lua/test.lua'))
    // });
    // Orange.defineCommand(aM.consumate_game, {
    //     lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/consumate_game.lua'))
    // });
    Orange.defineCommand('consumate_game', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/consumate_game.lua'))
    });
    Orange.defineCommand('init_game', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_game_003.lua'))
    });
    Orange.defineCommand('init_season', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_season_003.lua'))
    });
    Orange.defineCommand('init_team', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_team.lua'))
    });
    Orange.defineCommand('init_league', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_league_003.lua'))
    });
    return Orange;
};
var sunspot = function (rangeYellow, event_wrapper_func) {
    var consumate_game_005 = function (ticket, cb) {
        var str_payload = JSON.stringify(_.assign(ticket, event_wrapper_func('consumate_game')));
        rangeYellow.consumate_game(1, str_payload)
            .then(function (res) {
            cb(res);
        })
            .error(function (err) {
            cb(err);
        });
    };
    var init_game_005 = function (ticket, cb) {
        var temp_000 = _.assign(ticket, event_wrapper_func('init_game'));
        // if lodash docs say can chain objects into the assign
        // call then can get rid of the temp var above and just
        // assign twice to ticket in the same call.
        var str_payload = JSON.stringify(_.assign(temp_000, {
            gameZ: uuid.v4()
        }));
        rangeYellow.init_game(1, str_payload)
            .then(function (res) {
            cb(JSON.parse(res));
        })
            .error(function (err) {
            cb(err);
        });
    };
    var init_season_005 = function (ticket, cb) {
        var str_payload = JSON.stringify(_.assign(ticket, {
            seasonZ: uuid.v4()
        }));
        rangeYellow.init_season(1, str_payload)
            .then(function (res) {
            var res2 = JSON.parse(res);
            cb(res2);
        })
            .error(function (err) {
            cb(err);
        });
    };
    var init_team_005 = function (ticket, cb) {
        var str_payload = JSON.stringify(_.assign(ticket, {
            timestamp: Date.now(),
            teamZ: uuid.v4()
        }));
        rangeYellow.init_team(1, str_payload)
            .then(function (res) {
            var res2 = JSON.parse(res);
            cb(res2);
        })
            .error(function (err) {
            cb(err);
        });
    };
    // because we generate the leagueZ here in this layer
    var init_league_005 = function (ticket, cb) {
        var str_payload = JSON.stringify(_.assign(ticket, {
            event_type: 'init_league',
            eventZ: uuid.v4(),
            time_stamp: Date.now(),
            leagueZ: uuid.v4()
        }));
        rangeYellow.init_league(1, str_payload)
            .then(function (res) {
            var res2 = JSON.parse(res);
            cb(res2);
        })
            .error(function (err) {
            cb(err);
        });
    };
    return {
        consumate_game: consumate_game_005,
        init_game: init_game_005,
        init_season: init_season_005,
        init_team: init_team_005,
        init_league: init_league_005,
    };
};
function default_1(message, Orange) {
    var event_wrapper_obj_000 = function (event_type) {
        return {
            event_type: event_type,
            eventZ: uuid.v4(),
            time_stamp: Date.now()
        };
    };
    var rangeYellow = Promise.promisifyAll(api__000("magnanimity", Orange));
    return sunspot(rangeYellow, event_wrapper_obj_000);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
