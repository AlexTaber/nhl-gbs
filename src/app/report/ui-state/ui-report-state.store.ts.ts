import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UIReportState } from './ui-report-state.model';

function createUIInitialState(): UIReportState {
  return {
    filterOptions: [
      { name: 'Coming Off Bench', value: 'comingOffBench' },
      { name: 'Include Overtime Data', value: 'includeOvertime' }
    ],
    yearOptions: [
      { name: 'All' },
      { name: '2018' },
      { name: '2017' },
      { name: '2016' },
      { name: '2015' },
      { name: '2014' },
      { name: '2013' },
      { name: '2012' },
      { name: '2011' },
      { name: '2010' }
    ]
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'UIReport', resettable: true })
export class UIReportStateStore extends Store<UIReportState> {

  constructor() {
    super(createUIInitialState());
    this
  }

}

