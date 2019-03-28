import { ReportStore } from './report.store';
import { Injectable } from '@angular/core';
import { Report } from './report.model';
import { ReportFetcherService } from './report-fetcher.service';

@Injectable({ providedIn: 'root' })
export class ReportService {

  constructor(
    private reportStore: ReportStore,
    private fetcher: ReportFetcherService
  ) {
  }

  setReportFromGameIds(year: number, teamId?: number) {
    this.fetcher.getReport(year, teamId).subscribe(report => {
      this.reportStore.add(report);
      this.reportStore.setActive(report.id);
      console.log(report);
    });
  }
}
