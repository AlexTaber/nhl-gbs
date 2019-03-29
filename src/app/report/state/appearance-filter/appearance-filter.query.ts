import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppearanceFilter } from './appearance-filter.model';
import { AppearanceFilterStore } from './appearance-filter.store';

@Injectable({ providedIn: 'root' })
export class AppearanceFilterQuery extends Query<AppearanceFilter> {
    filter$: Observable<AppearanceFilter> = this.select();

    constructor(
        protected store: AppearanceFilterStore
    ) {
        super(store);
    }
}
