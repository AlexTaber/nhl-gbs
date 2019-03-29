import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { GoalieStore, GoalieState } from './goalie.store';
import { Goalie } from './goalie.model';

@Injectable({ providedIn: 'root' })
export class GoalieQuery extends QueryEntity<GoalieState, Goalie> {
    goalies$: Observable<Goalie[]> = this.selectAll();

    constructor(protected store: GoalieStore) {
        super(store);
    }
}
