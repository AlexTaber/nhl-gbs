import { Injectable } from '@angular/core';
import { UIReportStore } from './ui-report.store';
import { YearOptionValue } from './ui-report.model';

@Injectable({ providedIn: 'root' })
export class UIReportService {

  constructor(
    private reportStore: UIReportStore
  ) {}

  updateSelectedYear(year: YearOptionValue): void {
    this.reportStore.update({
        selectedYear: year
    });
  }
}
