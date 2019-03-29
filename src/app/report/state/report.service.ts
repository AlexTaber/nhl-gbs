import { ReportStore } from './report.store';
import { Injectable } from '@angular/core';
import { ReportFetcherService } from './report-fetcher.service';
import { data2018 } from '../../../assets/report-2018.js';
import { data2017 } from '../../../assets/report-2017.js';
import { data2016 } from '../../../assets/report-2016.js';
import { data2015 } from '../../../assets/report-2015.js';
import { data2014 } from '../../../assets/report-2014.js';
import { ReportQuery } from './report.query';
import { YearOptionValue } from '../ui-state/ui-report.model';
import { ReportFactory } from './report.factory';

@Injectable({ providedIn: 'root' })
export class ReportService {

  constructor(
    private reportStore: ReportStore,
    private reportQuery: ReportQuery,
    private factory: ReportFactory
  ) {
    this.setInitialState();
  }

  setLocalReport(year: YearOptionValue) {
    const report = this.reportQuery.getAll().find(report => report.year === year);
    this.reportStore.setActive(report.id);
  }

  private setInitialState(): void {
    this.reportStore.add(data2018);
    this.reportStore.add(data2017);
    this.reportStore.add(data2016);
    this.reportStore.add(data2015);
    this.reportStore.add(data2014);
    const allReport = this.factory.mergeReports(this.reportQuery.getAll());
    console.log(allReport);
    this.reportStore.add(allReport);
    this.reportStore.setActive(allReport.id);
  }
}
