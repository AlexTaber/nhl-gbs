import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GoalieAppearanceStore, GoalieAppearanceState } from './goalie-appearance.store';
import { GoalieAppearance } from './goalie-appearance.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GoalieAppearanceQuery extends QueryEntity<GoalieAppearanceState, GoalieAppearance> {
    appearances$: Observable<GoalieAppearance[]> = this.selectAll();

    constructor(protected store: GoalieAppearanceStore) {
        super(store);
    }
}
