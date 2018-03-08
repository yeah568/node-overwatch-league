const fetch = require('node-fetch');

class OverwatchLeague {
  constructor({ locale = 'en-us', token = '', useChina = false } = {}) {
    this.apiBase = useChina
      ? 'https://api.overwatchleague.cn'
      : 'https://api.overwatchleague.com';
    this.locale = locale;
    this.token = token;
  }

  getTeams() {
    return fetch(`${this.apiBase}/teams`).then(res => res.json());
  }

  getTeam(id) {
    return fetch(`${this.apiBase}/team/${id}`).then(res => res.json());
  }

  getRanking() {
    return fetch(`${this.apiBase}/ranking`).then(res => res.json());
  }

  getStandings() {
    return fetch(`${this.apiBase}/standings`).then(res => res.json());
  }

  getMatches() {
    return fetch(`${this.apiBase}/matches`).then(res => res.json());
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

module.exports = OverwatchLeague;
