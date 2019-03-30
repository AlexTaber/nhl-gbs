import { Injectable } from '@angular/core';
import { ReportStore } from './report.store';
import { AppearanceFilterQuery } from '../appearance-filter/appearance-filter.query';
import { AppearanceFilter } from '../appearance-filter/appearance-filter.model';
import { GoalieAppearanceQuery } from '../appearances/goalie-appearance.query';
import { GoalieAppearance, GoalieForm } from '../appearances/goalie-appearance.model';

@Injectable({ providedIn: 'root' })
export class ReportService {

  constructor(
    private store: ReportStore,
    private appearanceQuery: GoalieAppearanceQuery,
    private filterQuery: AppearanceFilterQuery
  ) {
    this.filterQuery.filter$.subscribe(filter => this.runFilter(filter));
  }

  updateAppearances(): void {
    this.runFilter(this.filterQuery.getValue());
  }

  private runFilter(filter: AppearanceFilter): void {
    let filteredAppearances = this.appearanceQuery.getAll();
    filteredAppearances = this.checkApplyYearFilter(filter, filteredAppearances);
    filteredAppearances = this.checkApplyGoalieIdFilter(filter, filteredAppearances);
    filteredAppearances = this.checkApplyComingOffBenchFilter(filter, filteredAppearances);
    filteredAppearances = this.checkApplyOvertimeFilter(filter, filteredAppearances);
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

  private checkApplyOvertimeFilter(
    filter: AppearanceFilter,
    filteredAppearances: GoalieAppearance[]
  ): GoalieAppearance[] {
    return (!filter.includeOvertime) ? filteredAppearances.map(app => this.removeOvertimeDataFromAppearance(app)) : filteredAppearances;
  }

  private removeOvertimeDataFromAppearance(appearance: GoalieAppearance): GoalieAppearance {
    return {
      ...appearance,
      forms: appearance.forms.reduce((forms, form) => this.removeOvertimeDataFromForm(forms, form), [])
    }
  }

  private removeOvertimeDataFromForm(forms: GoalieForm[], form: GoalieForm): GoalieForm[] {
    if (form.overtimeShotStart === 1) {
      return forms;
    } else if (!!form.overtimeShotStart) {
      const newForm: GoalieForm = {
        ...form,
        goalAllowed: false,
        shots: form.overtimeShotStart - 1
      }
      forms.push(newForm);
    } else {
      forms.push(form);
    }

    return forms;
  }
}
