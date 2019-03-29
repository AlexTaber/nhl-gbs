import { Injectable } from '@angular/core';
import { UIReportStore } from './ui-report.store';
import { YearOptionValue } from './ui-report.model';
import { Goalie } from '../state/report.model';

@Injectable({ providedIn: 'root' })
export class UIReportService {

  constructor(
    private uiStore: UIReportStore
  ) {}

  updateSelectedYear(year: YearOptionValue): void {
    this.updateSelectedGoalie(undefined);
    this.uiStore.update({
        selectedYear: year
    });
  }

  updateSelectedGoalie(goalie: Goalie): void {
    this.uiStore.update({
        selectedGoalie: goalie
    });
  }
}
