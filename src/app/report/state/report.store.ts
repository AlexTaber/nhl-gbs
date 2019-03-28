import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Report } from './report.model';
import { Injectable } from '@angular/core';

export interface ReportState extends EntityState<Report>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'report' })
export class ReportStore extends EntityStore<ReportState, Report> {

  constructor() {
    super();
  }
}
