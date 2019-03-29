import { Injectable } from '@angular/core';
import { GoalieStore } from './goalie.store';
import { Goalie } from './goalie.model';
import { GoalieFactory } from './goalie.factory';

@Injectable({ providedIn: 'root' })
export class GoalieService {
    constructor(
        private store: GoalieStore,
        private factory: GoalieFactory
    ) {}

    addFromGameData(gameData: any): void {
        const goalies = this.factory.getGoaliesFromGame(gameData);
        this.add(goalies);
    }

    add(goalies: Goalie[]): void {
        this.store.add(goalies);
    }
}
