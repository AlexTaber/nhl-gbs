import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AppearanceFilter } from './appearance-filter.model';

function createInitialState(): AppearanceFilter {
  return { comingOffBench: false };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'AppearanceFilterStore', resettable: true })
export class AppearanceFilterStore extends Store<AppearanceFilter> {

  constructor() {
    super(createInitialState());
  }
}
