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
    /**
     *
     * @param {string} path
     */
    getJSON(path: string, expand?: string): Promise<any>;
    getTeams(): Promise<any>;
    /**
     *
     * @param {number} teamID
     */
    getTeam(teamID: number): Promise<any>;
    getTeamV2(teamID: number): Promise<any>;
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
    lastMatchForTeam(teamID: number): Promise<{}>;
    nextMatchForTeam(teamID: number): Promise<{}>;
    static teamIDs: {
        DALLAS_FUEL: number;
        PHILADELPHIA_FUSION: number;
        HOUSTON_OUTLAWS: number;
        BOSTON_UPRISING: number;
        NEW_YORK_EXCELSIOR: number;
        SAN_FRANCISCO_SHOCK: number;
        LOS_ANGELES_VALIANT: number;
        LOS_ANGELES_GLADIATORS: number;
        FLORIDA_MAYHEM: number;
        SHANGHAI_DRAGONS: number;
        SEOUL_DYNASTY: number;
        LONDON_SPITFIRE: number;
        CHENGDU_HUNTERS: number;
        HANGZHOU_SPARK: number;
        PARIS_ETERNAL: number;
        TORONTO_DEFIANT: number;
        VANCOUVER_TITANS: number;
        WASHINGTON_JUSTICE: number;
        ATLANTA_REIGN: number;
        GUANGZHOU_CHARGE: number;
    };
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
