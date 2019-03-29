import { QueryEntity } from '@datorama/akita';
import { ReportStore, ReportState } from './report.store';
import { Report, Goalie } from './report.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportQuery extends QueryEntity<ReportState, Report> {
  report$: Observable<Report> = this.selectActive();
  goalies$: Observable<Goalie[]> = this.selectActive(state => state.goalies);

  constructor(protected store: ReportStore) {
    super(store);
  }
}
