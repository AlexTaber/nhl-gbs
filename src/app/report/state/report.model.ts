import { ID } from '@datorama/akita';

export interface Report {
  id: ID;
  teamId: number;
  goalies: Goalie[];
  rawGames: RawGame[];
  totalGoalsAgainst: number;
  totalShots: number;
}

export interface Goalie {
  id: number;
  fullName: string;
  games: GoalieGame[];
  goalsAgainst: number;
  shots: number;
}

export interface GoalieGame {
  id: number;
  forms: GoalieForm[];
  timeEvaluated: number;
}

export interface GoalieForm {
  shots: number;
  goalAllowed: boolean;
}

export interface RawGame {
  id: number;
  shots: number;
  goalsFor: number;
}

export function createReport(params: Partial<Report>) {
  return {

  } as Report;
}
