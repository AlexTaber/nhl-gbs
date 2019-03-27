import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { concatMap, flatMap, map } from 'rxjs/operators';
import { Report, Goalie, GoalieGame, GoalieForm } from './report.model';
import { guid } from '@datorama/akita';

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
  }[]
}

@Injectable({ providedIn: 'root' })
export class ReportFetcherService {

  constructor(
    private http: HttpClient
  ) {}

  getReport(year: number, teamId: number): Observable<Report> {
    const report: Report = {
      id: guid(),
      teamId: teamId,
      goalies: []
    }

    return this.getGames(year, teamId).pipe(
      flatMap((response: any, index: number) => {
        const gameIds = response.dates.map(date => date.games[0].gamePk);
        return this.getGameAndUpdateReport(report, gameIds, 0);
      }),
      map(report => this.mapReportData(report))
    )
  }

  private getGameAndUpdateReport(report: Report, gameIds: number[], currentIndex: number): Observable<Report> {
    return this.getGame(gameIds[currentIndex]).pipe(
      concatMap((gameData: any, index: number) => {
        report = this.updateReportFromGame(report, gameData);
        currentIndex ++;
        return (currentIndex < gameIds.length) ? this.getGameAndUpdateReport(report, gameIds, currentIndex) : of(report);
      })
    )
  }

  private updateReportFromGame(report: Report, gameData: any): Report {
    const plays: Play[] = gameData.liveData.plays.allPlays;
    const shots = plays.filter(play => ((play.result.eventTypeId === "GOAL" && !play.result.emptyNet) || play.result.eventTypeId === "SHOT") && play.team.id !== report.teamId)
    return this.updateReportFromShots(report, shots, gameData.gamePk);
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
    let reportGoalie = report.goalies.find(goalie => goalie.id === shotGoalie.player.id);
    if (!reportGoalie) {
      reportGoalie = this.getNewReportGoalie(shotGoalie);
      report.goalies.push(reportGoalie);
    }
    let goalieGame = reportGoalie.games.find(game => game.id === gameId);
    if (!goalieGame) {
      goalieGame = this.getNewGoalieGame(gameId);
      reportGoalie.games.push(goalieGame);
    }

    const goalieForm = goalieGame.forms[goalieGame.forms.length - 1];
    goalieForm.shots ++;
    if (shot.result.eventTypeId === 'GOAL') {
      goalieForm.goalAllowed = true;
      goalieGame.forms.push(this.getNewGoalieForm());
    }
  }

  private getNewReportGoalie(shotGoalie: any): Goalie {
    return {
      ...shotGoalie.player,
      games: []
    };
  }

  private getNewGoalieGame(gameId: number): GoalieGame {
    return {
      id: gameId,
      forms: [ this.getNewGoalieForm() ],
      timeEvaluated: 0
    }
  }

  private getNewGoalieForm(): GoalieForm {
    return {
      goalAllowed: false,
      shots: 0
    }
  }

  private mapReportData(report: Report): Report {

    return report;
  }

  private getGame(id: number): Observable<any> {
    return this.http.get(`https://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`);
  }

  private getGames(year: number, teamId: number): Observable<any> {
    return this.http.get(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=${teamId}&startDate=${year}-10-01&endDate=${year + 1}-03-27`);
  }
}
