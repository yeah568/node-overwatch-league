import fetch from 'node-fetch';
// Whatwg-url is a fallback for node <6.13.0
const URL = require('url').URL || require('whatwg-url').URL;

interface BaseParams {
  token?: string;
  locale?: string;
  expand?: string;
}

function _matchCompare(a: any, b: any) {
  return a.startDate - b.startDate;
}

enum TeamID {
  DALLAS_FUEL = 4523,
  PHILADELPHIA_FUSION = 4524,
  HOUSTON_OUTLAWS = 4525,
  BOSTON_UPRISING = 4402,
  NEW_YORK_EXCELSIOR = 4403,
  SAN_FRANCISCO_SHOCK = 4404,
  LOS_ANGELES_VALIANT = 4405,
  LOS_ANGELES_GLADIATORS = 4406,
  FLORIDA_MAYHEM = 4407,
  SHANGHAI_DRAGONS = 4408,
  SEOUL_DYNASTY = 4409,
  LONDON_SPITFIRE = 4410,
  CHENGDU_HUNTERS = 7692,
  HANGZHOU_SPARK = 7693,
  PARIS_ETERNAL = 7694,
  TORONTO_DEFIANT = 7695,
  VANCOUVER_TITANS = 7696,
  WASHINGTON_JUSTICE = 7697,
  ATLANTA_REIGN = 7698,
  GUANGZHOU_CHARGE = 7699,
};

export class OverwatchLeague {
  private locale: string;
  private apiBase: string;
  private token: string;

  /**
   *
   * @param {Object} options
   */
  constructor({
    locale = OverwatchLeague.Locales.EN_US,
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
    Object.entries(params).forEach(([key, value]: [string, string]) => url.searchParams.append(key, value));

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
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

  /**
   *
   * @param {number} matchID
   */
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
          schedule.sort(_matchCompare);
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
          schedule.sort(_matchCompare);
          return resolve(
            schedule.find((match: any) => match.state === OverwatchLeague.Match.State.PENDING)
          );
        })
        .catch((err: any) => console.log(err));
    });
  }

  public static teamIDs = TeamID;

  public static teamNames = {
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

  public static Locales = {
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

  public static Match = {
    State: {
      PENDING: 'PENDING',
      CONCLUDED: 'CONCLUDED'
    }
  };
}
