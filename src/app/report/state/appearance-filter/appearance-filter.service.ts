import { Injectable } from '@angular/core';
import { AppearanceFilterStore } from '../appearance-filter/appearance-filter.store';
import { AppearanceFilter } from './appearance-filter.model';
import { YearOptionValue } from '../../ui-state/ui-report-state.model';
import { Goalie } from '../goalies/goalie.model';

@Injectable({ providedIn: 'root' })
export class AppearanceFilterService {

    constructor(
        private store: AppearanceFilterStore
    ) {}

    updateYear(year: YearOptionValue): void {
        const value = year === 'All' ?  undefined : year;
        this.store.update({
            year: value
        });
    }

    updateGoalieId(goalieId: number | undefined): void {
        this.store.update({goalieId: goalieId });
    }
}
