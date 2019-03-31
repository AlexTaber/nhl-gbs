import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UIReportState } from './ui-report-state.model';

function createUIInitialState(): UIReportState {
  return {
    fetching: true,
    sideNavOpen: false,
    filterOptions: [
      { name: 'Coming Off Bench', value: 'comingOffBench' },
      { name: 'Include Overtime Data', value: 'includeOvertime' }
    ],
    yearOptions: [
      { name: 'All (2010-2019)', value: 'all' },
      { name: '2018-19', value: '2018' },
      { name: '2017-18', value: '2017' },
      { name: '2016-17', value: '2016' },
      { name: '2015-16', value: '2015' },
      { name: '2014-15', value: '2014' },
      { name: '2013-14', value: '2013' },
      { name: '2012-13', value: '2012' },
      { name: '2011-12', value: '2011' },
      { name: '2010-11', value: '2010' }
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

