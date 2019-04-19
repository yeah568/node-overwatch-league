import { TeamID, Locale } from './constants';
export declare class OverwatchLeague {
    private locale;
    private apiBase;
    private token;
    private matchCompare;
    constructor({ locale, token, useChina }?: {
        locale?: Locale | undefined;
        token?: string | undefined;
        useChina?: boolean | undefined;
    });
    getJSON(path: string, expand?: string): Promise<any>;
    getTeams(): Promise<any>;
    getTeam(teamID: TeamID): Promise<any>;
    getTeamV2(teamID: TeamID): Promise<any>;
    getRanking(): Promise<any>;
    getStandings(): Promise<any>;
    getStandingsV2(): Promise<any>;
    getMatches(): Promise<any>;
    getMatch(matchID: number, expand?: string): Promise<any>;
    getSchedule(): Promise<any>;
    getVODs(perPage?: number, page?: number): Promise<any>;
    getLiveMatch(): Promise<any>;
    getMaps(): Promise<any>;
    lastMatchForTeam(teamID: TeamID): Promise<{}>;
    nextMatchForTeam(teamID: TeamID): Promise<{}>;
    static teamIDs: typeof TeamID;
    static teamNames: {
        4523: string;
        4524: string;
        4525: string;
        4402: string;
        4403: string;
        4404: string;
        4405: string;
        4406: string;
        4407: string;
        4408: string;
        4409: string;
        4410: string;
        7692: string;
        7693: string;
        7694: string;
        7695: string;
        7696: string;
        7697: string;
        7698: string;
        7699: string;
    };
    static Locales: typeof Locale;
    static Match: {
        State: {
            PENDING: string;
            CONCLUDED: string;
        };
    };
}
