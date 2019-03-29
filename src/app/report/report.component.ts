import { Component, OnInit } from '@angular/core';
import { ReportQuery } from './state/report.query';
import { Observable } from 'rxjs';
import { Report, Goalie } from './state/report.model';
import { UIReportQuery } from './ui-state/ui-report.query';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  report$: Observable<Report> = this.reportQuery.report$;
  goalies$: Observable<Goalie[]> = this.reportQuery.goalies$;
  selectedGoalie$: Observable<Goalie> = this.uiQuery.selectedGoalie$;

  constructor(
    private reportQuery: ReportQuery,
    private uiQuery: UIReportQuery
  ) { }

  ngOnInit() {}
}
