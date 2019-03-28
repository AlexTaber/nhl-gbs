import { Component, OnInit } from '@angular/core';
import { ReportService } from './state/report.service';
import { ReportQuery } from './state/report.query';
import { Observable } from 'rxjs';
import { Report } from './state/report.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  report$: Observable<Report> = this.reportQuery.report$;

  constructor(
    private reportService: ReportService,
    private reportQuery: ReportQuery
  ) { }

  ngOnInit() {}
}
