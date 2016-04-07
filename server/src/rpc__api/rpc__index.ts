
import path = require('path');
var port: number = process.env.PORT || 3000;
import * as _ from 'lodash';
// const Rx = require('rxjs');
// const Bluebird = require('bluebird');
import Bluebird = require('bluebird');
import IoRedis = require('ioredis');
var Orange = IoRedis.createClient();
const Promise = Bluebird.Promise;
const c = function(...args: any[]) {console.log.apply(console, args);};
const base = "../";

import league from '../range__api/league_002'
import game from '../range__api/game_002'

var sunspot = league("league", Orange);
var novaspot = game('game', Orange);
var rpc__api;

exports.rpc__api = rpc__api = function (data: any, cb:any) {
    c(data.event_type || data.type);
    if (data.type === 'falcon') {cb('falcon_ack')}
    if (data.event_type == 'boogieboogie') {c('hasnteuh');}
    switch (data.event_type) {
        case "LlEAGUE_LINE_GET_STATE_LINE": {},
        
        case "LlEAGUE_CONSUMATE_LINE": {

        },
        case "LlEAGUE_EDIT_LINE": {

        },
        case "LlEAGUE_DEFINE_LINE": {
            // wrap a real world game witha  bunch of metadata
        },
        case "LlEAGUE_PLAYER_ACCEPT_INVITE": {

        },
        case "LlEAGUE_INVITE_PLAYER": {

        },
        case "LlEAGUE_INIT": {

        },
        case "CONSUMATE_GAME": { // complete it fill in scores, finalise its outcome

        }
        case "ADD_GAME_TO_SEASON": {

        },
        case "ADD_SEASON_TO_LEAGUE": {

        },
        case "ADD_TEAM_TO_LEAGUE": {
            sunspot.add_team_001(data, (res) => {
                c('rpc has ', res);
                // c('keys in rpc', _.keys(res.res))
                cb(res);
            });
            break;
        },
        case "league_init": {
            sunspot.league_init(data.name, (res) => {
                c("rpc has callback with", res);
                cb(res);
            });
            break;
        },
        case "boogieboogie": {
            c('boohogogogogo');
            cb('bogogogogonthntho');
        },
    };

};

exports.default = function (message: string, primus: any) {
    c('message', message);
    var counter = 0;
    // to start with we'll just let anyone have rights to do st
    primus.on('connection', (spark) => {
        c('Primus has connection spark', spark);
        spark.on('data', (data)=> {
            rpc__api(data, (res)=> {
            primus.write(res);
        }});
        setInterval(()=> {
            counter ++;
            primus.write({stuff: "stuff of hey yeah this is a primus write " + counter });
        }, 7000);
    return 393939
};