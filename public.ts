import {
  Game as DBGame,
  Match as DBMatch,
  MatchGame as DBMatchGame,
  Player as DBPlayer,
  Round as DBRound,
  RoundMatch as DBRoundMatch,
  Team as DBTeam,
  Tournament as DBTournament,
  VideoGame as DBVideoGame,
} from "../db - typings/public.ts";
import { Attributes } from "../db - typings/utils.ts";

export class PartialTournament {
  public tournament_id: DBTournament["id"];
  public tournament_name: DBTournament["name"];
  public tournament_game_id: DBVideoGame["id"];
  public tournament_game_name: DBVideoGame["name"];
  public tournament_date: DBTournament["date"];
  public tournament_time: DBTournament["time"];

  public constructor(t: Attributes<PartialTournament>) {
    this.tournament_id = t.tournament_id;
    this.tournament_name = t.tournament_name;
    this.tournament_game_id = t.tournament_game_id;
    this.tournament_game_name = t.tournament_game_name;
    this.tournament_date = t.tournament_date;
    this.tournament_time = t.tournament_time;
  }
}

export class Tournament extends PartialTournament {
  public tournament_teams: PartialTeam[];
  public tournament_rounds: Round[];

  public constructor(t: Attributes<PartialTournament>) {
    super(t);
    this.tournament_teams = [];
    this.tournament_rounds = [];
  }
}

export abstract class PartialTeam {
  public team_id: DBTeam["id"];
  public team_name: DBTeam["name"];

  public constructor(t: Attributes<PartialTeam>) {
    this.team_id = t.team_id;
    this.team_name = t.team_name;
  }
}

export class PartialPlayer {
  public player_id: DBPlayer["id"];
  public player_name: DBPlayer["name"];

  public constructor(p: Attributes<PartialPlayer>) {
    this.player_id = p.player_id;
    this.player_name = p.player_name;
  }
}

class PartialRound {
  public round_id: DBRound["id"];
  public round_name: DBRound["name"];
  public round_time: DBRound["time"];
  public round_order: DBRoundMatch["order"];

  public constructor(r: Attributes<PartialRound>) {
    this.round_id = r.round_id;
    this.round_name = r.round_name;
    this.round_time = r.round_time;
    this.round_order = r.round_order;
  }
}

export class Round extends PartialRound {
  public round_matches: Match[];

  public constructor(r: Attributes<PartialRound>) {
    super(r);
    this.round_matches = [];
  }
}

export abstract class PartialMatch {
  public match_id: DBMatch["id"];
  public match_name: DBMatch["name"];
  public match_order: DBRoundMatch["order"];

  public constructor(m: Attributes<PartialMatch>) {
    this.match_id = m.match_id;
    this.match_name = m.match_name;
    this.match_order = m.match_order;
  }
}

export abstract class Match extends PartialMatch {
  public match_teams: (PartialTeam & { team_order: number })[];
  public match_games: Game[];

  public constructor(m: Attributes<PartialMatch>) {
    super(m);
    this.match_teams = [];
    this.match_games = [];
  }

  public abstract getWinnerId(): number | null;

  public isFinal(): boolean {
    return /.*final.*/i.test(this.match_name);
  }
}

class PartialGame {
  public game_id: DBGame["id"];
  public game_name: DBGame["name"];
  public game_order: DBMatchGame["order"];

  public constructor(g: Attributes<PartialGame>) {
    this.game_id = g.game_id;
    this.game_name = g.game_name;
    this.game_order = g.game_order;
  }
}

class Game extends PartialGame {
  public game_results: Result[];

  public constructor(g: Attributes<PartialGame>) {
    super(g);
    this.game_results = [];
  }
}

export class Result {
  public result_team_id: number;

  public constructor(r: Attributes<Result>) {
    this.result_team_id = r.result_team_id;
  }
}
