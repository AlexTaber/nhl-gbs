import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { GoalieAppearance, GoalieForm } from './goalie-appearance.model';
import { Play, Player, Team } from '../../report.fetcher';

@Injectable({ providedIn: 'root' })
export class GoalieAppearanceFactory {
    getAppearancesFromGame(gameData: any): GoalieAppearance[] {
        const plays: Play[] = gameData.liveData.plays.allPlays;
        const shots = this.getShotsFromPlays(plays);
        return this.getAppearancesFromShots(shots, gameData);
    }

    getShotsFromPlays(plays: Play[]): Play[] {
        return plays.filter(play => this.playIsValidShot(play));
    }

    private getAppearancesFromShots(shots: Play[], gameData: any): GoalieAppearance[] {
        return shots.reduce((appearances: GoalieAppearance[], shot: Play) => this.updateAppearancesFromShot(appearances, shot, gameData), []);
    }

    private updateAppearancesFromShot(
        appearances: GoalieAppearance[],
        shot: Play,
        gameData: any
    ): GoalieAppearance[] {
        const shotGoalie = shot.players.find(player => player.playerType === "Goalie");
        const goalieTeam: Team = this.getGoalieTeamFromGameData(gameData, shot);
        const teamAppearances = appearances.filter(appearance => appearance.gamePk === gameData.gamePk && appearance.teamId === goalieTeam.id);
        let evaluatedAppearance = teamAppearances.find(appearance => appearance.goalieId === shotGoalie.player.id);
        if (!evaluatedAppearance) {
            const isComingOffBench = teamAppearances.length > 0;
            evaluatedAppearance = this.getNewGoalieAppearance(shotGoalie, gameData.gamePk, goalieTeam.id, isComingOffBench);
            appearances.push(evaluatedAppearance);
        }
        const goalieForm = evaluatedAppearance.forms[evaluatedAppearance.forms.length - 1];
        goalieForm.shots++;
        if (shot.about.periodType === 'OVERTIME' && !goalieForm.overtimeShotStart) {
            goalieForm.overtimeShotStart = goalieForm.shots;
        }
        if (shot.result.eventTypeId === 'GOAL') {
            goalieForm.goalAllowed = true;
            evaluatedAppearance.forms.push(this.getNewGoalieForm());
        }
        return appearances;
    }

    private getNewGoalieAppearance(
        shotGoalie: Player,
        gamePk: number,
        teamId: number,
        isComingOffBench: boolean
    ): GoalieAppearance {
        return {
            id: guid(),
            gamePk,
            goalieId: shotGoalie.player.id,
            forms: [ this.getNewGoalieForm() ],
            teamId,
            isComingOffBench
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
        return !!shotGoalie && (isValidGoal || play.result.eventTypeId === "SHOT") && (play.about.periodType === 'REGULAR' || play.about.periodType === 'OVERTIME');
    }

    private getGoalieTeamFromGameData(gameData: any, shot: Play): Team {
        const teams = [ gameData.gameData.teams.home, gameData.gameData.teams.away ];
        return teams.find(team => team.id !== shot.team.id);
    }
}
