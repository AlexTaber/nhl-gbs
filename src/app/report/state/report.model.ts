import { ID } from '@datorama/akita';

export interface Report {
  id: ID;
  teamId: number;
  goalies: Goalie[];
}

export interface Goalie {
  id: number;
  fullName: string;
  games: GoalieGame[];
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

export function createReport(params: Partial<Report>) {
  return {

  } as Report;
}
