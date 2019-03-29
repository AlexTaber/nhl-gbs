import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UIReport } from './ui-report.model';

function createUIInitialState(): UIReport {
  return {
    selectedGoalie: undefined,
    selectedYear: 'All',
    yearOptions: [
      { name: 'All' },
      { name: '2018' },
      { name: '2017' },
      { name: '2016' },
      { name: '2015' },
      { name: '2014' }
    ]
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'UIReport', resettable: true })
export class UIReportStore extends Store<UIReport> {

  constructor() {
    super(createUIInitialState());
    this
  }

}

