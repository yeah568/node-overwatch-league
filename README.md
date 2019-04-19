# node-overwatch-league
A Node wrapper for the Overwatch League API.

**NOTE:** The Overwatch League API is not officially supported by Blizzard, and is subject to change at any time. The documentation for the API has been developed by the community, and may or may not be complete. Keep this in mind before relying on this for a production app!

## Usage

```js
const OverwatchLeague = require('node-overwatch-league');
const owlClient = new OverwatchLeague();

owlClient.getTeam(OverwatchLeague.teamIDs.VANCOUVER_TITANS)
  .then(team => console.log(team));
```

## Installation

`npm install node-overwatch-league --save`

## Methods

Work in progress while the implementation is being fleshed out a bit more.

`new OverwatchLeague([options])`
- `options` (object): All options are optional.
  - `locale` (string): The locale for response to be returned in. Currently does nothing.
  - `token` (string): A token for an authenticated user. Required if using user-specific methods. Currently does nothing.
  - `useChina` (boolean, default `false`): Whether or not to use the Chinese API endpoint.

`owl.getTeams()`

`owl.getTeam(teamID)`

`owl.getRanking()`

`owl.getStandings()`

`owl.getMatches()`

`owl.getMatch(matchID)`

`owl.getSchedule()`

`owl.getVODs(perPage, page)`

## Constants
The OverwatchLeague class contains some constants as properties to make working with the API a bit easier.

* `OverwatchLeague.teamIDs`: A map of team names to IDs.
  eg. `OverwatchLeague.teamIDs.VANCOUVER_TITANS` returns `7696`, the ID for Florida.
* `OverwatchLeague.Match.State`: Match state. Either `PENDING` or `CONCLUDED`.