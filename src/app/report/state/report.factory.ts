import { Injectable } from '@angular/core';
import { Report, Goalie, GoalieGame, GoalieForm } from './report.model';
import { guid } from '@datorama/akita';
import { YearOptionValue } from '../ui-state/ui-report.model';

interface Play {
    result: {
        eventTypeId: "GOAL" | "SHOT",
        emptyNet: boolean
    },
    team: {
        id: number
    },
    players: {
        playerType: string,
        player: Goalie
    }[],
    about: {
        periodType: 'REGULAR'
    }
}

@Injectable({ providedIn: 'root' })
export class ReportFactory {
    getInitialReport(year: YearOptionValue): Report {
        return {
            id: guid(),
            year: year,
            goalies: [],
            totalGoalsAgainst: 0,
            totalShots: 0
        }
    }

    updateReportFromGame(report: Report, gameData: any): Report {
        const plays: Play[] = gameData.liveData.plays.allPlays;
        const shots = this.getShotsFromPlays(plays);
        return this.updateReportFromShots(report, shots, gameData.gamePk);
    }

    mergeReports(reports: Report[]): Report {
        console.log(reports);
        return reports.reduce((combinedReport: Report, currentReport: Report) => {
            this.combineReports(currentReport, combinedReport);
            return combinedReport;
        }, this.getInitialReport('All'))
    }

    private combineReports(addedReport: Report, report: Report): void {
        for (let goalie of addedReport.goalies) { this.addOrUpdateReportGoalie(goalie, report); }
        report.totalGoalsAgainst += addedReport.totalGoalsAgainst;
        report.totalShots += addedReport.totalShots;
    }

    private addOrUpdateReportGoalie(goalie: Goalie, report: Report): void {
        const existingGoalie = report.goalies.find(checkedGoalie => goalie.id === checkedGoalie.id);
        if (existingGoalie) {
            const index = report.goalies.indexOf(existingGoalie);
            const newGoalie = {
                ...existingGoalie,
                games: [ ...goalie.games, ...existingGoalie.games ]
            };
            report.goalies = [
                ...report.goalies.slice(0, index),
                newGoalie,
                ...report.goalies.slice(index + 1)
            ] as Goalie[];
        } else {
            report.goalies.push(goalie);
        }
    }

    private updateReportFromShots(report: Report, shots: Play[], gameId: number): Report {
        return shots.reduce((report: Report, shot: Play) => this.updateReportFromShot(report, shot, gameId), report);
    }

    private updateReportFromShot(report: Report, shot: Play, gameId: number): Report {
        this.updateReportGoalieFromShot(report, shot, gameId);
        return report;
    }

    private updateReportGoalieFromShot(report: Report, shot: Play, gameId: number): void {
        const shotGoalie = shot.players.find(player => player.playerType === "Goalie");
        if (!!shotGoalie) {
            let reportGoalie = report.goalies.find(goalie => goalie.id === shotGoalie.player.id);
            if (!reportGoalie) {
                reportGoalie = this.getNewReportGoalie(shotGoalie);
                report.goalies.push(reportGoalie);
            }
            let goalieGame = reportGoalie.games.find(goalieGame => goalieGame.id === gameId);
            if (!goalieGame) {
                goalieGame = this.getNewGoalieGame(gameId);
                reportGoalie.games.push(goalieGame);
            }

            const goalieForm = goalieGame.forms[goalieGame.forms.length - 1];
            goalieForm.shots++;
            reportGoalie.shots ++;
            report.totalShots ++;
            if (shot.result.eventTypeId === 'GOAL') {
                goalieForm.goalAllowed = true;
                goalieGame.forms.push(this.getNewGoalieForm());
                reportGoalie.goalsAgainst ++;
                report.totalGoalsAgainst ++;
            }
        }
    }

    private getNewReportGoalie(shotGoalie: any): Goalie {
        return {
            ...shotGoalie.player,
            games: [],
            goalsAfterPoorStart: 0,
            shotsAfterPoorStart: 0,
            goalsAgainst: 0,
            shots: 0
        };
    }

    private getNewGoalieGame(gameId: number): GoalieGame {
        return {
            id: gameId,
            forms: [this.getNewGoalieForm()],
            timeEvaluated: 0
        }
    }

    private getNewGoalieForm(): GoalieForm {
        return {
            goalAllowed: false,
            shots: 0
        }
    }

    private getShotsFromPlays(plays: Play[]): Play[] {
        return plays.filter(play => ((play.result.eventTypeId === "GOAL" && !play.result.emptyNet) || play.result.eventTypeId === "SHOT") && play.about.periodType === 'REGULAR');
    }
}