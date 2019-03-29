import { Injectable } from '@angular/core';
import { UIReportStateStore } from './ui-report-state.store.ts';

@Injectable({ providedIn: 'root' })
export class UIReportStateService {

  constructor(
    private uiStore: UIReportStateStore
  ) {}
}
