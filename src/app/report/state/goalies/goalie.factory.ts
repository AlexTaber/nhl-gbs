import { Injectable } from '@angular/core';
import { Goalie } from './goalie.model';
import { Play } from '../../report.fetcher';
import { GoalieAppearanceFactory } from '../appearances/goalie-appearance.factory';
import { guid } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class GoalieFactory {
    constructor(
        private appearanceFactory: GoalieAppearanceFactory
    ) {}

    getGoaliesFromGame(gameData: any): Goalie[] {
        const plays: Play[] = gameData.liveData.plays.allPlays;
        const shots = this.appearanceFactory.getShotsFromPlays(plays);
        return this.getGoaliesFromShots(shots);
    }

    private getGoaliesFromShots(shots: Play[]): Goalie[] {
        return shots.reduce((goalies: Goalie[], shot: Play) => this.reduceGoaliesFromShot(goalies, shot), []);
    }

    private reduceGoaliesFromShot(goalies: Goalie[], shot: Play): Goalie[] {
        const shotGoalie = shot.players.find(player => player.playerType === "Goalie");
        const existingGoalie = goalies.find(goalie => goalie.id === shotGoalie.player.id);
        if (!existingGoalie) { goalies.push(shotGoalie.player); }
        return goalies;
    }
}
