import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Report } from './report.model';

function createInitialState(): Report {
  return {
    appearances: []
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ReportStore', resettable: true })
export class ReportStore extends Store<Report> {

  constructor() {
    super(createInitialState());
  }
}
