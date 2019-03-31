import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UIReportState, YearOption, FilterOption } from './ui-report-state.model';
import { UIReportStateStore } from './ui-report-state.store.ts';

@Injectable({ providedIn: 'root' })
export class UIReportStateQuery extends Query<UIReportState> {
    uiReportState$: Observable<UIReportState> = this.select();
    yearOptions$: Observable<YearOption[]> = this.select(state => state.yearOptions);
    filterOptions$: Observable<FilterOption[]> = this.select(state => state.filterOptions);
    fetching$: Observable<boolean> = this.select(state => state.fetching);
    sideNavOpen$: Observable<boolean> = this.select(state => state.sideNavOpen);

    constructor(
        protected store: UIReportStateStore
    ) {
        super(store);
    }
}
