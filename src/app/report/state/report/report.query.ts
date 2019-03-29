import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from './report.model';
import { ReportStore } from './report.store';
import { GoalieAppearance } from '../appearances/goalie-appearance.model';

@Injectable({ providedIn: 'root' })
export class ReportQuery extends Query<Report> {
    report$: Observable<Report> = this.select();
    appearances$: Observable<GoalieAppearance[]> = this.select(state => state.appearances);

    constructor(
        protected store: ReportStore
    ) {
        super(store);
    }
}
