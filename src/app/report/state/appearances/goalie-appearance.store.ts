import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { GoalieAppearance } from './goalie-appearance.model';

export interface GoalieAppearanceState extends EntityState<GoalieAppearance> {}

export function createInitialState(): GoalieAppearanceState {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'GoalieAppearanceStore', resettable: true })
export class GoalieAppearanceStore extends EntityStore<GoalieAppearanceState, GoalieAppearance> {

  constructor() {
    super(createInitialState());
  }
}
