import { Injectable } from '@angular/core';
import { GoalieAppearance } from './goalie-appearance.model';
import { GoalieAppearanceStore } from './goalie-appearance.store';
import { GoalieAppearanceFactory } from './goalie-appearance.factory';

@Injectable({ providedIn: 'root' })
export class GoalieAppearanceService {
    constructor(
        private store: GoalieAppearanceStore,
        private factory: GoalieAppearanceFactory
    ) {}

    addFromGameData(gameData: any): void {
        const appearances = this.factory.getAppearancesFromGame(gameData);
        this.add(appearances);
    }

    add(appearances: GoalieAppearance[]): void {
        this.store.add(appearances);
    }
}
