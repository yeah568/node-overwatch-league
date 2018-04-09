const fetch = require('node-fetch');

class OverwatchLeague {
  /**
   *
   * @param {Object} options
   */
  constructor({ locale = 'en-us', token = '', useChina = false } = {}) {
    this.apiBase = useChina
      ? 'https://api.overwatchleague.cn'
      : 'https://api.overwatchleague.com';
    this.locale = locale;
    this.token = token;
  }

  /**
   *
   * @param {string} path
   */
  getJSON(path) {
    return fetch(`${this.apiBase}${path}`).then(res => res.json());
  }

  getTeams() {
    return this.getJSON('/teams');
  }

  /**
   *
   * @param {number} teamID
   */
  getTeam(teamID) {
    return this.getJSON(`/team/${teamID}`);
  }

  getRanking() {
    return this.getJSON(`/ranking`);
  }

  getStandings() {
    return this.getJSON(`/standings`);
  }

  getMatches() {
    return this.getJSON(`/matches`);
  }

  /**
   *
   * @param {number} matchID
   */
  getMatch(matchID) {
    return this.getJSON(`/match/${matchID}`);
  }

  getSchedule() {
    return this.getJSON(`/schedule`);
  }

  getVODs(perPage = 50, page = 1) {
    return this.getJSON(`/vods?per_page=${perPage}&page=${page}`);
  }

  lastMatchForTeam(teamID) {
    return new Promise(resolve => {
      this.getTeam(teamID).then(data => {
        resolve(
          data.schedule
            .filter(match => match.state === OverwatchLeague.Match.State.CONCLUDED)
            .pop()
        );
      });
    });
  }

  nextMatchForTeam(teamID) {
    return new Promise(resolve => {
      this.getTeam(teamID).then(data => {
        resolve(
          data.schedule.find(match => match.state === OverwatchLeague.Match.State.PENDING)
        );
      });
    });
  }
}

OverwatchLeague.teamIDs = {
  DALLAS_FUEL: 4523,
  PHILADELPHIA_FUSION: 4524,
  HOUSTON_OUTLAWS: 4525,
  BOSTON_UPRISING: 4402,
  NEW_YORK_EXCELSIOR: 4403,
  SAN_FRANCISCO_SHOCK: 4404,
  LOS_ANGELES_VALIANT: 4405,
  LOS_ANGELES_GLADIATORS: 4406,
  FLORIDA_MAYHEM: 4407,
  SHANGHAI_DRAGONS: 4408,
  SEOUL_DYNASTY: 4409,
  LONDON_SPITFIRE: 4410
};

OverwatchLeague.Match = {
  State: {
    PENDING: 'PENDING',
    CONCLUDED: 'CONCLUDED'
  }
};

module.exports = OverwatchLeague;
