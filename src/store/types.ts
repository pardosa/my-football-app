export type TLeague = {
  id?: number;
  name: string;
  type: string;
  logo: string;
};

export type Country = {
  name: string;
  code: null | string;
  flag: null | string;
};

export type Fixture = {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
};

export type Coverage = {
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
  fixtures: Fixture[];
};

export type Season = {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: Coverage;
};

export type TLeagues = {
  league: TLeague;
  country: Country;
  seasons: Season[];
};
