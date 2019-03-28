import { ReportStore } from './report.store';
import { Injectable } from '@angular/core';
import { ReportFetcherService } from './report-fetcher.service';

@Injectable({ providedIn: 'root' })
export class ReportService {

  constructor(
    private reportStore: ReportStore,
    private fetcher: ReportFetcherService
  ) {
  }

  setLocalReport(year: number) {
    this.fetcher.getLocalReport(year).subscribe(report => {
      this.reportStore.add(report);
      this.reportStore.setActive(report.id);
      console.log(report);
    });
  }
}
