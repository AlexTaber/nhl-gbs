import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Goalie } from './state/goalies/goalie.model';
import { GoalieQuery } from './state/goalies/goalie.query';
import { GoalieAppearance } from './state/appearances/goalie-appearance.model';
import { ReportFetcher } from './report.fetcher';
import { ReportQuery } from './state/report/report.query';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  goalies$: Observable<Goalie[]> = this.goalieQuery.goalies$;
  appearances$: Observable<GoalieAppearance[]> = this.reportQuery.appearances$;

  constructor(
    private goalieQuery: GoalieQuery,
    private reportQuery: ReportQuery,
    private fetcher: ReportFetcher
  ) { }

  ngOnInit() {
    this.fetcher.fetchAppearances('2010-10-01', '2019-03-29');
    // this.fetcher.setLocalData();
  }
}
