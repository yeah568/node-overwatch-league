import fetch from 'node-fetch';
import { TeamID, Locale } from './constants';
// Whatwg-url is a fallback for node <6.13.0
const URL = require('url').URL || require('whatwg-url').URL;

interface BaseParams {
  token?: string;
  locale?: Locale;
  expand?: string;
}

export class OverwatchLeague {
  private locale: Locale;
  private apiBase: string;
  private token: string;

  private matchCompare(a: any, b: any) {
    return a.startDate - b.startDate;
  }

  constructor({
    locale = Locale.EN_US,
    token = '',
    useChina = false
  } = {}) {
    this.apiBase = useChina
      ? 'https://api.overwatchleague.cn'
      : 'https://api.overwatchleague.com';
    this.locale = locale;
    this.token = token;
  }

  getJSON(path: string, expand?: string) {
    const url = new URL(`${this.apiBase}${path}`);
    const params: BaseParams = {};
    if (this.token) {
      params.token = this.token;
    }
    if (this.locale) {
      params.locale = this.locale;
    }
    if (expand) {
      params.expand = expand;
    }
    Object.entries(params).forEach(
      ([key, value]: [string, string]) => {
        url.searchParams.append(key, value);
      });

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => res.json());
  }

  getTeams() {
    // Known expands:
    // team.content
    return this.getJSON('/teams');
  }

  getTeam(teamID: TeamID) {
    return this.getJSON(`/team/${teamID}`);
  }

  getTeamV2(teamID: TeamID) {
    // Known expands:
    // schedule
    return this.getJSON(`/v2/team/${teamID}`);
  }

  getRanking() {
    return this.getJSON(`/ranking`);
  }

  getStandings() {
    return this.getJSON(`/standings`);
  }

  getStandingsV2() {
    return this.getJSON(`/v2/standings`);
  }

  getMatches() {
    return this.getJSON(`/matches`);
  }

  getMatch(matchID: number, expand?: string) {
    return this.getJSON(`/match/${matchID}`, expand);
  }

  getSchedule() {
    // Known expands:
    // team.content
    return this.getJSON(`/schedule`);
  }

  getVODs(perPage = 50, page = 1) {
    return this.getJSON(`/vods?per_page=${perPage}&page=${page}`);
  }

  getLiveMatch() {
    // Known expands:
    // team.content
    return this.getJSON(`/live-match`);
  }

  getMaps() {
    return this.getJSON(`/maps`);
  }

  lastMatchForTeam(teamID: TeamID) {
    return new Promise(resolve => {
      this.getTeam(teamID)
        .then(data => {
          const schedule = data.schedule;
          schedule.sort(this.matchCompare);
          return resolve(
            schedule
              .filter((match: any) => match.state === OverwatchLeague.Match.State.CONCLUDED)
              .pop()
          );
        })
        .catch((err: any) => console.log(err));
    });
  }

  nextMatchForTeam(teamID: TeamID) {
    return new Promise(resolve => {
      this.getTeam(teamID)
        .then((data: any) => {
          const schedule = data.schedule;
          schedule.sort(this.matchCompare);
          return resolve(
            schedule.find((match: any) => match.state === OverwatchLeague.Match.State.PENDING)
          );
        })
        .catch((err: any) => console.log(err));
    });
  }

  static teamIDs = TeamID;

  static teamNames = {
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

  static Locales = Locale;

  static Match = {
    State: {
      PENDING: 'PENDING',
      CONCLUDED: 'CONCLUDED'
    }
  };
}
