"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
// Whatwg-url is a fallback for node <6.13.0
var URL = require('url').URL || require('whatwg-url').URL;
function _matchCompare(a, b) {
    return a.startDate - b.startDate;
}
var TeamID;
(function (TeamID) {
    TeamID[TeamID["DALLAS_FUEL"] = 4523] = "DALLAS_FUEL";
    TeamID[TeamID["PHILADELPHIA_FUSION"] = 4524] = "PHILADELPHIA_FUSION";
    TeamID[TeamID["HOUSTON_OUTLAWS"] = 4525] = "HOUSTON_OUTLAWS";
    TeamID[TeamID["BOSTON_UPRISING"] = 4402] = "BOSTON_UPRISING";
    TeamID[TeamID["NEW_YORK_EXCELSIOR"] = 4403] = "NEW_YORK_EXCELSIOR";
    TeamID[TeamID["SAN_FRANCISCO_SHOCK"] = 4404] = "SAN_FRANCISCO_SHOCK";
    TeamID[TeamID["LOS_ANGELES_VALIANT"] = 4405] = "LOS_ANGELES_VALIANT";
    TeamID[TeamID["LOS_ANGELES_GLADIATORS"] = 4406] = "LOS_ANGELES_GLADIATORS";
    TeamID[TeamID["FLORIDA_MAYHEM"] = 4407] = "FLORIDA_MAYHEM";
    TeamID[TeamID["SHANGHAI_DRAGONS"] = 4408] = "SHANGHAI_DRAGONS";
    TeamID[TeamID["SEOUL_DYNASTY"] = 4409] = "SEOUL_DYNASTY";
    TeamID[TeamID["LONDON_SPITFIRE"] = 4410] = "LONDON_SPITFIRE";
    TeamID[TeamID["CHENGDU_HUNTERS"] = 7692] = "CHENGDU_HUNTERS";
    TeamID[TeamID["HANGZHOU_SPARK"] = 7693] = "HANGZHOU_SPARK";
    TeamID[TeamID["PARIS_ETERNAL"] = 7694] = "PARIS_ETERNAL";
    TeamID[TeamID["TORONTO_DEFIANT"] = 7695] = "TORONTO_DEFIANT";
    TeamID[TeamID["VANCOUVER_TITANS"] = 7696] = "VANCOUVER_TITANS";
    TeamID[TeamID["WASHINGTON_JUSTICE"] = 7697] = "WASHINGTON_JUSTICE";
    TeamID[TeamID["ATLANTA_REIGN"] = 7698] = "ATLANTA_REIGN";
    TeamID[TeamID["GUANGZHOU_CHARGE"] = 7699] = "GUANGZHOU_CHARGE";
})(TeamID || (TeamID = {}));
;
var OverwatchLeague = /** @class */ (function () {
    /**
     *
     * @param {Object} options
     */
    function OverwatchLeague(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.locale, locale = _c === void 0 ? OverwatchLeague.Locales.EN_US : _c, _d = _b.token, token = _d === void 0 ? '' : _d, _e = _b.useChina, useChina = _e === void 0 ? false : _e;
        this.apiBase = useChina
            ? 'https://api.overwatchleague.cn'
            : 'https://api.overwatchleague.com';
        this.locale = locale;
        this.token = token;
    }
    OverwatchLeague.prototype.getJSON = function (path, expand) {
        var url = new URL("" + this.apiBase + path);
        var params = {};
        if (this.token) {
            params.token = this.token;
        }
        if (this.locale) {
            params.locale = this.locale;
        }
        if (expand) {
            params.expand = expand;
        }
        Object.entries(params).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            return url.searchParams.append(key, value);
        });
        return node_fetch_1.default(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        }).then(function (res) { return res.json(); });
    };
    OverwatchLeague.prototype.getTeams = function () {
        // Known expands:
        // team.content
        return this.getJSON('/teams');
    };
    OverwatchLeague.prototype.getTeam = function (teamID) {
        return this.getJSON("/team/" + teamID);
    };
    OverwatchLeague.prototype.getTeamV2 = function (teamID) {
        // Known expands:
        // schedule
        return this.getJSON("/v2/team/" + teamID);
    };
    OverwatchLeague.prototype.getRanking = function () {
        return this.getJSON("/ranking");
    };
    OverwatchLeague.prototype.getStandings = function () {
        return this.getJSON("/standings");
    };
    OverwatchLeague.prototype.getStandingsV2 = function () {
        return this.getJSON("/v2/standings");
    };
    OverwatchLeague.prototype.getMatches = function () {
        return this.getJSON("/matches");
    };
    /**
     *
     * @param {number} matchID
     */
    OverwatchLeague.prototype.getMatch = function (matchID, expand) {
        return this.getJSON("/match/" + matchID, expand);
    };
    OverwatchLeague.prototype.getSchedule = function () {
        // Known expands:
        // team.content
        return this.getJSON("/schedule");
    };
    OverwatchLeague.prototype.getVODs = function (perPage, page) {
        if (perPage === void 0) { perPage = 50; }
        if (page === void 0) { page = 1; }
        return this.getJSON("/vods?per_page=" + perPage + "&page=" + page);
    };
    OverwatchLeague.prototype.getLiveMatch = function () {
        // Known expands:
        // team.content
        return this.getJSON("/live-match");
    };
    OverwatchLeague.prototype.getMaps = function () {
        return this.getJSON("/maps");
    };
    OverwatchLeague.prototype.lastMatchForTeam = function (teamID) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getTeam(teamID)
                .then(function (data) {
                var schedule = data.schedule;
                schedule.sort(_matchCompare);
                return resolve(schedule
                    .filter(function (match) { return match.state === OverwatchLeague.Match.State.CONCLUDED; })
                    .pop());
            })
                .catch(function (err) { return console.log(err); });
        });
    };
    OverwatchLeague.prototype.nextMatchForTeam = function (teamID) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getTeam(teamID)
                .then(function (data) {
                var schedule = data.schedule;
                schedule.sort(_matchCompare);
                return resolve(schedule.find(function (match) { return match.state === OverwatchLeague.Match.State.PENDING; }));
            })
                .catch(function (err) { return console.log(err); });
        });
    };
    OverwatchLeague.teamIDs = TeamID;
    OverwatchLeague.teamNames = {
        4523: 'Dallas Fuel',
        4524: 'Philadelphia Fusion',
        4525: 'Houston Outlaws',
        4402: 'Boston Uprising',
        4403: 'New York Excelsior',
        4404: 'San Francisco Shock',
        4405: 'Los Angeles Valiant',
        4406: 'Los Angeles Gladiators',
        4407: 'Florida Mayhem',
        4408: 'Shanghai Dragons',
        4409: 'Seoul Dynasty',
        4410: 'London Spitfire',
        7692: 'Chengdu Hunters',
        7693: 'Hangzhou Spark',
        7694: 'Paris Eternal',
        7695: 'Toronto Defiant',
        7696: 'Vancouver Titans',
        7697: 'Washington Justice',
        7698: 'Atlanta Reign',
        7699: 'Guangzhou Charge'
    };
    OverwatchLeague.Locales = {
        DE_DE: 'de_DE',
        EN_US: 'en_US',
        EN_GB: 'en_GB',
        ES_ES: 'es_ES',
        ES_MX: 'es_MX',
        FR_FR: 'fr_FR',
        IT_IT: 'it_IT',
        PT_BR: 'pt_BR',
        PL_PL: 'pl_PL',
        RU_RU: 'ru_RU',
        KO_KR: 'ko_KR',
        JA_JP: 'ja_JP',
        ZH_TW: 'zh_TW'
        // ZH_CH is done via the useChina option.
    };
    OverwatchLeague.Match = {
        State: {
            PENDING: 'PENDING',
            CONCLUDED: 'CONCLUDED'
        }
    };
    return OverwatchLeague;
}());
exports.OverwatchLeague = OverwatchLeague;
