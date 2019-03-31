import { Injectable } from '@angular/core';
import { UIReportStateStore } from './ui-report-state.store.ts';
import { UIReportStateQuery } from './ui-report-state.query';

@Injectable({ providedIn: 'root' })
export class UIReportStateService {

  constructor(
    private uiStore: UIReportStateStore,
    private query: UIReportStateQuery
  ) {}

  updateFetching(fetching: boolean): void {
    this.uiStore.update({ fetching });
  }

  toggleSideNavOpen(): void {
    this.uiStore.update({ sideNavOpen: !this.query.getValue().sideNavOpen });
  }
}
