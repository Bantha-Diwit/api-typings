import { Game } from "../../db - typings/public.ts";
import {
	RocketLeagueGameResult, RocketLeagueRank,
} from "../../db - typings/rocket_league/rocket_league.ts";
import { Attributes } from "../../db - typings/utils.ts";
import {
	Match, PartialMatch, PartialPlayer, PartialTeam, Result,
} from "../public.ts";

class RocketLeaguePartialTeam extends PartialTeam {
	public team_avg_rank: RocketLeagueRank["id"];
	public team_avg_rank_name: RocketLeagueRank["name"];

	public constructor(t: Attributes<RocketLeaguePartialTeam>) {
		super(t as Extract<RocketLeaguePartialTeam, PartialTeam>);
		this.team_avg_rank = t.team_avg_rank;
		this.team_avg_rank_name = t.team_avg_rank_name;
	}
}

export class RocketLeagueTeam extends RocketLeaguePartialTeam {
	public team_players: RocketLeaguePlayer[];

	public constructor(t: Attributes<RocketLeaguePartialTeam>) {
		super(t);
		this.team_players = [];
	}
}

class RocketLeaguePlayer extends PartialPlayer {
	public player_real_rank: RocketLeagueRank["id"];
	public player_real_rank_name: RocketLeagueRank["name"];
	public player_perceived_rank: RocketLeagueRank["id"];
	public player_perceived_rank_name: RocketLeagueRank["name"];

	public constructor(p: Attributes<RocketLeaguePlayer>) {
		super(p as Extract<RocketLeaguePlayer, PartialPlayer>);
		this.player_real_rank = p.player_real_rank;
		this.player_real_rank_name = p.player_real_rank_name;
		this.player_perceived_rank = p.player_perceived_rank;
		this.player_perceived_rank_name = p.player_perceived_rank_name;
	}
}

export class RocketLeagueMatch extends Match {
	public constructor(o: Attributes<PartialMatch>) {
		super(o as Extract<RocketLeagueMatch, PartialMatch>);
	}

	public getWinnerId(): number | null {
        type MatchTeam = PartialTeam & { team_order: number };
        /*
		const team_scores = this.match_teams.reduce((p, c) => p.set(c.team_id, 0), new Map<PartialTeam["team_id"], number>());
		const r = Array.from(
            this.match_games
			.reduce((p: Map<PartialTeam["team_id"], number>, c: Game) => {
                // TODO
				return p;
			}, team_scores)
			.entries()
        )
			.find(([key, value]: [PartialTeam["team_id"], number], index: number, arr: Array<[PartialTeam["team_id"], number]>) => {
				return value === Math.max(...arr.map((e: [PartialTeam["team_id"],  number]): number => e[1]));
			});
		return r ? r[1] : null;
		*/
		return null;
	}
}

export class RocketLeagueResult extends Result {
	public result_score: RocketLeagueGameResult["score"];
	public result_assists: RocketLeagueGameResult["assists"];
	public result_saves: RocketLeagueGameResult["saves"];
	public result_shots: RocketLeagueGameResult["shots"];
	public result_goals: RocketLeagueGameResult["goals"];

	public constructor(r: RocketLeagueResult) {
		super(r as Extract<RocketLeagueResult, Result>);
		this.result_score = r.result_score;
		this.result_assists = r.result_assists;
		this.result_saves = r.result_saves;
		this.result_shots = r.result_shots;
		this.result_goals = r.result_goals;
	}
}
