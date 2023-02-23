/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/leagues": {
    /** @description Get list of Leagues */
    get: {
      /** @description Get list of Leagues */
      parameters?: {
          /** @description Get list of Leagues by name */
        query?: {
          name?: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["Leagues"])[];
          };
        };
      };
    };
  };
  "/teams": {
    /** @description Get list of Teams */
    get: {
      /** @description Get list of Teams */
      parameters?: {
          /** @description Get list of Teams by name */
        query?: {
          name?: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["Teams"])[];
          };
        };
      };
    };
  };
  "/standings": {
    /** @description Get list of standings */
    get: {
      /** @description Get list of standings */
      parameters?: {
          /** @description Get list of standings by season and team id  or league id */
        query?: {
          id?: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["Standings"])[];
          };
        };
      };
    };
  };
  "/fixtures": {
    /** @description Get list of standings */
    get: {
      /** @description Get list of standings */
      parameters: {
          /** @description Get list of Fixtures by season and team id */
          /** @description Get list of Fixtures by season and team id */
        query: {
          id: number;
          season: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["Fixtures"])[];
          };
        };
      };
    };
  };
  "/player": {
    /** @description Get list of players */
    get: {
      /** @description Get list of players */
      parameters?: {
          /** @description Get list of players by id */
        query?: {
          id?: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": (components["schemas"]["PlayerStatistics"])[];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Leagues: {
      league?: components["schemas"]["League"];
      country?: components["schemas"]["Country"];
      seasons?: (components["schemas"]["Season"])[];
    };
    League: {
      id?: string;
      name: string;
      logo?: string;
      flag?: string;
      country?: string;
      type?: string;
    };
    Country: {
      name: string;
      code?: string;
      flag?: string;
    };
    Season: {
      year?: string;
      start?: string;
      end?: string;
      coverage?: components["schemas"]["Coverage"];
    };
    SeasonFixture: {
      events?: boolean;
      lineups?: boolean;
      statistics_fixtures?: boolean;
      statistics_players?: boolean;
    };
    Coverage: {
      standings?: boolean;
      players?: boolean;
      top_scorers?: boolean;
      top_assists?: boolean;
      top_cards?: boolean;
      injuries?: boolean;
      predictions?: boolean;
      odds?: boolean;
      fixtures?: (components["schemas"]["SeasonFixture"])[];
    };
    Player: {
      id?: string;
      name: string;
      firstname?: string;
      lastname?: string;
      age?: number;
      nationality?: string;
      height?: string;
      weight?: string;
      photo?: string;
      injured?: boolean;
      birth?: {
        date?: string;
        place?: string;
        country?: string;
      };
    };
    PlayerGames: {
      appearences?: string;
      position?: string;
      rating?: string;
      lineups?: number;
      minutes?: number;
      number?: number;
      captain?: boolean;
    };
    PlayerSubstitutes: {
      in?: number;
      out?: number;
      bench?: number;
    };
    PlayerShots: {
      total?: number;
      on?: number;
    };
    PlayerGoals: {
      total?: number;
      conceded?: number;
      assists?: number;
      saves?: number;
    };
    PlayerPasses: {
      total?: number;
      key?: number;
      accuracy?: number;
    };
    PlayerTackles: {
      total?: number;
      blocks?: number;
      interceptions?: number;
    };
    PlayerDuels: {
      total?: number;
      won?: number;
    };
    PlayerDribbles: {
      attempts?: number;
      success?: number;
      past?: number;
    };
    PlayerFouls: {
      drawn?: number;
      committed?: number;
    };
    PlayerCards: {
      yellow?: number;
      yellowred?: number;
      red?: number;
    };
    PlayerPenalty: {
      won?: number;
      commited?: number;
      scored?: number;
      missed?: number;
      saved?: number;
    };
    Statistics: {
      team?: components["schemas"]["Team"];
      league?: components["schemas"]["League"];
      games?: components["schemas"]["PlayerGames"];
      substitutes?: components["schemas"]["PlayerSubstitutes"];
      shots?: components["schemas"]["PlayerShots"];
      goals?: components["schemas"]["PlayerGoals"];
      passes?: components["schemas"]["PlayerPasses"];
      tackles?: components["schemas"]["PlayerTackles"];
      duels?: components["schemas"]["PlayerDuels"];
      dribbles?: components["schemas"]["PlayerDribbles"];
      fouls?: components["schemas"]["PlayerFouls"];
      cards?: components["schemas"]["PlayerCards"];
      penalty?: components["schemas"]["PlayerPenalty"];
    };
    PlayerStatistics: {
      player?: components["schemas"]["Player"];
      statistics?: (components["schemas"]["Statistics"])[];
    };
    Teams: {
      team?: components["schemas"]["Team"];
      venue?: components["schemas"]["Venue"];
    };
    Team: {
      id?: number;
      name?: string;
      country?: string;
      founded?: number;
      national?: boolean;
      logo?: string;
      winner?: boolean;
    };
    Venue: {
      id?: number;
      name?: string;
      address?: string;
      city?: number;
      capacity?: number;
      surface?: string;
      image?: string;
    };
    Periods: {
      first?: number;
      second?: number;
    };
    Fixture: {
      id?: number;
      referee?: string;
      timezone?: string;
      date?: string;
      timestamp?: number;
      periods?: components["schemas"]["Periods"];
      venue?: components["schemas"]["Venue"];
      status?: {
        long?: string;
        short?: string;
        elapsed?: number;
      };
    };
    FixtureTeams: {
      home?: components["schemas"]["Team"];
      away?: components["schemas"]["Team"];
    };
    FixtureGoals: {
      home?: number;
      away?: number;
    };
    FixturePlayer: {
      id?: number;
      name?: string;
      number?: number;
      grid?: string;
      pos?: string;
    };
    Coach: {
      id?: number;
      name?: string;
      photo?: string;
    };
    EventsPlayer: {
      player?: components["schemas"]["FixturePlayer"];
    };
    FixtureEvents: {
      type?: string;
      detail?: string;
      assist?: components["schemas"]["FixturePlayer"];
      player?: components["schemas"]["FixturePlayer"];
      team?: components["schemas"]["Team"];
      time?: {
        elapsed?: number;
        extra?: string;
      };
    };
    FixtureScores: {
      halftime?: components["schemas"]["FixtureGoals"];
      fulltime?: components["schemas"]["FixtureGoals"];
      extratime?: components["schemas"]["FixtureGoals"];
      penalty?: components["schemas"]["FixtureGoals"];
    };
    FixtureLeague: components["schemas"]["League"] & {
      season?: string;
      round?: string;
    };
    FixtureLineups: {
      coach?: components["schemas"]["Coach"];
      startXI?: (components["schemas"]["EventsPlayer"])[];
      substitutes?: (components["schemas"]["EventsPlayer"])[];
      formation?: string;
    };
    Fixtures: {
      fixture?: components["schemas"]["Fixture"];
      league?: components["schemas"]["FixtureLeague"];
      teams?: components["schemas"]["FixtureTeams"];
      goals?: components["schemas"]["FixtureGoals"];
      scores?: components["schemas"]["FixtureScores"];
      events?: (components["schemas"]["FixtureEvents"])[];
      lineups?: (components["schemas"]["FixtureLineups"])[];
    };
    StandingGoals: {
      for?: number;
      againts?: number;
    };
    StandingGame: {
      played?: number;
      win?: number;
      draw?: number;
      lose?: number;
      goals?: components["schemas"]["StandingGoals"];
    };
    StandingTeam: {
      rank?: number;
      team?: components["schemas"]["Team"];
      points?: number;
      goalsDiff?: number;
      group?: string;
      form?: string;
      status?: string;
      description?: string;
      all?: components["schemas"]["StandingGame"];
      home?: components["schemas"]["StandingGame"];
      away?: components["schemas"]["StandingGame"];
    };
    StandingArray: (components["schemas"]["StandingTeam"])[];
    StandingLeague: components["schemas"]["League"] & {
      season?: string;
      standings: (components["schemas"]["StandingArray"])[];
    };
    Standings: {
      league?: components["schemas"]["StandingLeague"];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export type operations = Record<string, never>;
