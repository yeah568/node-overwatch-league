declare enum TeamID {
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
    GUANGZHOU_CHARGE = 7699
}
export declare class OverwatchLeague {
    private locale;
    private apiBase;
    private token;
    /**
     *
     * @param {Object} options
     */
    constructor({ locale, token, useChina }?: {
        locale?: string | undefined;
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
    /**
     *
     * @param {number} matchID
     */
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
    static Locales: {
        DE_DE: string;
        EN_US: string;
        EN_GB: string;
        ES_ES: string;
        ES_MX: string;
        FR_FR: string;
        IT_IT: string;
        PT_BR: string;
        PL_PL: string;
        RU_RU: string;
        KO_KR: string;
        JA_JP: string;
        ZH_TW: string;
    };
    static Match: {
        State: {
            PENDING: string;
            CONCLUDED: string;
        };
    };
}
export {};
