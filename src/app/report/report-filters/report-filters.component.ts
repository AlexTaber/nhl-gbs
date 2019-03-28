import { Component, OnInit } from '@angular/core';
import { UIReportQuery } from '../ui-state/ui-report.query';
import { Observable } from 'rxjs';
import { YearOption, YearOptionValue } from '../ui-state/ui-report.model';
import { MatSelectChange } from '@angular/material';
import { UIReportService } from '../ui-state/ui-report.service';
import { ReportService } from '../state/report.service';

@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss']
})
export class ReportFiltersComponent implements OnInit {
  yearOptions$: Observable<YearOption[]> = this.uiQuery.yearOptions$;
  selectedYear$: Observable<YearOptionValue> = this.uiQuery.selectedYear$;

  constructor(
    private uiQuery: UIReportQuery,
    private uiService: UIReportService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
  }

  onYearSelect(event: MatSelectChange): void {
    this.uiService.updateSelectedYear(event.value);
    this.reportService.setLocalReport(event.value);
  }
}
