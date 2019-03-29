import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Goalie } from './goalie.model';

export interface GoalieState extends EntityState<Goalie> {}

export function createInitialState(): GoalieState {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'GoalieStore', resettable: true })
export class GoalieStore extends EntityStore<GoalieState, Goalie> {

  constructor() {
    super(createInitialState());
  }
}
