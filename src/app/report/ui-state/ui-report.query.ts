import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UIReport, YearOption, YearOptionValue, GoalieOptionValue } from './ui-report.model';
import { UIReportStore } from './ui-report.store';
import { ReportQuery } from '../state/report.query';
import { Goalie } from '../state/report.model';

@Injectable({ providedIn: 'root' })
export class UIReportQuery extends Query<UIReport> {
    uiState$: Observable<UIReport> = this.select();
    yearOptions$: Observable<YearOption[]> = this.select(state => state.yearOptions);
    selectedYear$: Observable<YearOptionValue> = this.select(state => state.selectedYear);
    selectedGoalie$: Observable<Goalie> = this.select(state => state.selectedGoalie);

    constructor(
        protected store: UIReportStore,
        private reportQuery: ReportQuery
    ) {
        super(store);
    }
}
