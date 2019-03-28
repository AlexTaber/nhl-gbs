import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UIReport, YearOption, YearOptionValue } from './ui-report.model';
import { UIReportStore } from './ui-report.store';

@Injectable({ providedIn: 'root' })
export class UIReportQuery extends Query<UIReport> {
    uiState$: Observable<UIReport> = this.select();
    yearOptions$: Observable<YearOption[]> = this.select(state => state.yearOptions);
    selectedYear$: Observable<YearOptionValue> = this.select(state => state.selectedYear);

    constructor(
        protected store: UIReportStore
    ) {
        super(store);
    }
}
