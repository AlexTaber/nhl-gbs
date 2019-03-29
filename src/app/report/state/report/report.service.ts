import { Injectable } from '@angular/core';
import { ReportStore } from './report.store';
import { AppearanceFilterQuery } from '../appearance-filter/appearance-filter.query';
import { AppearanceFilter } from '../appearance-filter/appearance-filter.model';
import { GoalieAppearanceQuery } from '../appearances/goalie-appearance.query';
import { GoalieAppearance } from '../appearances/goalie-appearance.model';

@Injectable({ providedIn: 'root' })
export class ReportService {

  constructor(
    private store: ReportStore,
    private appearanceQuery: GoalieAppearanceQuery,
    private filterQuery: AppearanceFilterQuery
  ) {
    this.filterQuery.filter$.subscribe(filter => this.runFilter(filter));
  }

  updateAppearances(appearances: GoalieAppearance[]): void {
    this.store.update({
      appearances
    });
  }

  private runFilter(filter: AppearanceFilter): void {
    let filteredAppearances = this.appearanceQuery.getAll();
    filteredAppearances = this.checkApplyYearFilter(filter, filteredAppearances);
    filteredAppearances = this.checkApplyGoalieIdFilter(filter, filteredAppearances);
    filteredAppearances = this.checkApplyComingOffBenchFilter(filter, filteredAppearances);
    this.store.update({
      appearances: filteredAppearances
    });
  }

  private checkApplyYearFilter(filter: AppearanceFilter, filteredAppearances: GoalieAppearance[]): GoalieAppearance[] {
    return (!!filter.year) ? filteredAppearances.filter(app => app.gamePk.toString().slice(0, 4) === filter.year) : filteredAppearances;
  }

  private checkApplyGoalieIdFilter(
    filter: AppearanceFilter,
    filteredAppearances: GoalieAppearance[]
  ): GoalieAppearance[] {
    return (!!filter.goalieId) ? filteredAppearances.filter(app => app.goalieId === filter.goalieId) : filteredAppearances;
  }

  private checkApplyComingOffBenchFilter(
    filter: AppearanceFilter,
    filteredAppearances: GoalieAppearance[]
  ): GoalieAppearance[] {
    return (filter.comingOffBench) ? filteredAppearances.filter(app => app.isComingOffBench) : filteredAppearances;
  }
}
