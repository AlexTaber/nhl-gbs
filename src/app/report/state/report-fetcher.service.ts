import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { concatMap, flatMap } from 'rxjs/operators';
import { Report } from './report.model';
import { ReportFactory } from './report.factory';
import { data2018 } from '../../../assets/report-2018.js';
import { data2017 } from '../../../assets/report-2017.js';
import { data2016 } from '../../../assets/report-2016.js';
import { data2015 } from '../../../assets/report-2015.js';
import { data2014 } from '../../../assets/report-2014.js';

@Injectable({ providedIn: 'root' })
export class ReportFetcherService {
  localReports = {
    '2018': data2018,
    '2017': data2017,
    '2016': data2016,
    '2015': data2015,
    '2014': data2014
  };

  constructor(
    private http: HttpClient,
    private factory: ReportFactory
  ) {}

  getRemoteReport(year: number, teamId: number): Observable<Report> {
    const report: Report = this.factory.getInitialReport(teamId);

    return this.getGames(year, teamId).pipe(
      flatMap((response: any, index: number) => {
        const gameIds = response.dates.reduce((ids, date) => ids.concat(date.games.map(game => game.gamePk)), []);
        return this.getGameAndUpdateReport(report, gameIds, 0);
      })
    )
  }

  getLocalReport(year): Observable<Report> {
    return of(this.localReports[year]);
  }

  private getGameAndUpdateReport(report: Report, gameIds: number[], currentIndex: number): Observable<Report> {
    return this.getGame(gameIds[currentIndex]).pipe(
      concatMap((gameData: any, index: number) => {
        report = this.factory.updateReportFromGame(report, gameData);
        currentIndex ++;
        return (currentIndex < gameIds.length) ? this.getGameAndUpdateReport(report, gameIds, currentIndex) : of(report);
      })
    )
  }

  

  private getGame(id: number): Observable<any> {
    return this.http.get(`https://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`);
  }

  private getGames(year: number, teamId: number): Observable<any> {
    const teamIdUri = !!teamId ? `teamId=${teamId}&` : '';
    return this.http.get(`https://statsapi.web.nhl.com/api/v1/schedule?${teamIdUri}startDate=${year}-10-03&endDate=${year + 1}-03-27`);
  }
}
