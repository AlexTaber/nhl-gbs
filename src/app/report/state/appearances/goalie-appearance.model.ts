import { ID } from '@datorama/akita';

export interface GoalieAppearance {
    id: ID;
    gamePk: number;
    goalieId: number;
    forms: GoalieForm[];
}

export interface GoalieForm {
    shots: number;
    goalAllowed: boolean;
}
