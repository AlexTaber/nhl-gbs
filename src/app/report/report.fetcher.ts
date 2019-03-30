import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { Goalie } from './state/goalies/goalie.model';
import { GoalieAppearanceService } from './state/appearances/goalie-appearance.service';
import { GoalieService } from './state/goalies/goalie.service';
import { GoalieAppearanceQuery } from './state/appearances/goalie-appearance.query';
import { GoalieQuery } from './state/goalies/goalie.query';
import { allGoalies } from '../../assets/goalies';
import { allAppearances } from '../../assets/appearances';
import { ReportService } from './state/report/report.service';

export interface Play {
  result: {
      eventTypeId: "GOAL" | "SHOT",
      emptyNet: boolean
  },
  team: Team,
  players: Player[],
  about: {
      periodType: 'REGULAR' | 'OVERTIME'
  }
}

export interface Player {
  playerType: string,
  player: Goalie
}

export interface Team {
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ReportFetcher {
  constructor(
    private http: HttpClient,
    private appearanceService: GoalieAppearanceService,
    private goalieService: GoalieService,
    private appearanceQuery: GoalieAppearanceQuery,
    private goalieQuery: GoalieQuery,
    private reportService: ReportService
  ) {}

  fetchAppearances(startDate: string, endDate: string): void {
    this.getGames(startDate, endDate).pipe(
      switchMap((response: any, index: number) => {
        const gameIds = response.dates.reduce((ids, date) => this.reduceGameIdsFromDate(ids, date), []);
        return this.getGameAndAddEntities(gameIds, 0);
      })
    ).subscribe(() => this.onFetchComplete());
  }

  setLocalData(): void {
    this.goalieService.add(allGoalies);
    this.appearanceService.add(allAppearances);
    this.onFetchComplete();
  }

  private reduceGameIdsFromDate(gameIds: number[], date: any): number[] {
    const newGameIds = date.games.filter(game => game.gameType === 'R').map(game => game.gamePk);
    return gameIds.concat(newGameIds);
  }

  private getGameAndAddEntities(gameIds: number[], currentIndex: number): Observable<boolean> {
    return this.getGame(gameIds[currentIndex]).pipe(
      concatMap((gameData: any, index: number) => {
        this.addEntitiesFromGame(gameData);
        currentIndex ++;
        return (currentIndex < gameIds.length) ? this.getGameAndAddEntities(gameIds, currentIndex) : of(true);
      })
    );
  }

  private addEntitiesFromGame(gameData: any): void {
    this.goalieService.addFromGameData(gameData);
    this.appearanceService.addFromGameData(gameData);
  }

  private getGame(id: number): Observable<any> {
    return this.http.get(`https://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`);
  }

  private getGames(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`https://statsapi.web.nhl.com/api/v1/schedule?startDate=${startDate}&endDate=${endDate}`);
  }

  private onFetchComplete(): void {
    this.reportService.updateAppearances();
    this.printData();
  }

  private printData(): void {
    console.log(this.goalieQuery.getAll());
    console.log(this.appearanceQuery.getAll());
  }
}
