export declare enum AccountType {
    TWITTER = 0,
    YOUTUBE_CHANNEL = 1,
    TWITCH = 2,
    INSTAGRAM = 3,
    FACEBOOK = 4
}
export declare enum Locale {
    DE_DE = "de_DE",
    EN_US = "en_US",
    EN_GB = "en_GB",
    ES_ES = "es_ES",
    ES_MX = "es_MX",
    FR_FR = "fr_FR",
    IT_IT = "it_IT",
    PT_BR = "pt_BR",
    PL_PL = "pl_PL",
    RU_RU = "ru_RU",
    KO_KR = "ko_KR",
    JA_JP = "ja_JP",
    ZH_TW = "zh_TW",
    ZH_CH = "zh_CH"
}
export declare enum TeamID {
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
export interface Image {
    svg: string;
    png: string;
}
export interface Logo {
    main: Image;
    mainName: Image;
    altDark: Image;
}
export interface Account {
    id: number;
    type: string;
    url: string;
}
export interface Player {
    id: TeamID;
    handle: string;
    name: string;
    fullName: string;
    role: string;
    accounts: Account[];
    number: number;
    headshot: string;
    homeLocation: string;
}
export interface Competitor {
    id: TeamID;
    divisionId: number;
    handle: string;
    name: string;
    abbreviatedName: string;
    logo: Logo;
    hasFallback: boolean;
    location: string;
    players: Player[];
    website: string;
    placement: number;
    advantage: number;
    records: any;
}
