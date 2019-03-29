import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { GoalieAppearance, GoalieForm } from './goalie-appearance.model';
import { Play, Player } from '../../report.fetcher';

@Injectable({ providedIn: 'root' })
export class GoalieAppearanceFactory {
    getAppearancesFromGame(gameData: any): GoalieAppearance[] {
        const plays: Play[] = gameData.liveData.plays.allPlays;
        const shots = this.getShotsFromPlays(plays);
        return this.getAppearancesFromShots(shots, gameData.gamePk);
    }

    getShotsFromPlays(plays: Play[]): Play[] {
        return plays.filter(play => this.playIsValidShot(play));
    }

    private getAppearancesFromShots(shots: Play[], gamePk: number): GoalieAppearance[] {
        return shots.reduce((appearances: GoalieAppearance[], shot: Play) => this.updateAppearancesFromShot(appearances, shot, gamePk), []);
    }

    private updateAppearancesFromShot(
        appearances: GoalieAppearance[],
        shot: Play,
        gamePk: number
    ): GoalieAppearance[] {
        const shotGoalie = shot.players.find(player => player.playerType === "Goalie");
        let evaluatedAppearance = appearances.find(appearance => appearance.goalieId === shotGoalie.player.id && appearance.gamePk === gamePk);
        if (!evaluatedAppearance) {
            evaluatedAppearance = this.getNewGoalieAppearance(shotGoalie, gamePk);
            appearances.push(evaluatedAppearance);
        }
        const goalieForm = evaluatedAppearance.forms[evaluatedAppearance.forms.length - 1];
        goalieForm.shots++;
        if (shot.result.eventTypeId === 'GOAL') {
            goalieForm.goalAllowed = true;
            evaluatedAppearance.forms.push(this.getNewGoalieForm());
        }
        return appearances;
    }

    private getNewGoalieAppearance(shotGoalie: Player, gamePk: number): GoalieAppearance {
        return {
            id: guid(),
            gamePk,
            goalieId: shotGoalie.player.id,
            forms: [ this.getNewGoalieForm() ]
        }
    }

    private getNewGoalieForm(): GoalieForm {
        return {
            goalAllowed: false,
            shots: 0
        }
    }

    private playIsValidShot(play: Play): boolean {
        const isValidGoal = play.result.eventTypeId === "GOAL" && !play.result.emptyNet;
        const shotGoalie = !!play.players ? play.players.find(player => player.playerType === "Goalie") : undefined;
        return !!shotGoalie && (isValidGoal || play.result.eventTypeId === "SHOT") && play.about.periodType === 'REGULAR';
    }
}
