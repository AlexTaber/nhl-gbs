import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Goalie } from './state/goalies/goalie.model';
import { GoalieQuery } from './state/goalies/goalie.query';
import { GoalieAppearance } from './state/appearances/goalie-appearance.model';
import { ReportFetcher } from './report.fetcher';
import { ReportQuery } from './state/report/report.query';
import { UIReportStateQuery } from './ui-state/ui-report-state.query';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  goalies$: Observable<Goalie[]> = this.goalieQuery.goalies$;
  appearances$: Observable<GoalieAppearance[]> = this.reportQuery.appearances$;
  fetching$: Observable<boolean> = this.uiQuery.fetching$;
  sideNavOpen$: Observable<boolean> = this.uiQuery.sideNavOpen$;

  constructor(
    private goalieQuery: GoalieQuery,
    private reportQuery: ReportQuery,
    private fetcher: ReportFetcher,
    private uiQuery: UIReportStateQuery
  ) { }

  ngOnInit() {
    // this.fetcher.fetchAppearances('2010-10-01', '2019-03-29');
    this.fetcher.setLocalData();
  }
}
