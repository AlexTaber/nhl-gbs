import { Component, OnInit, Input } from '@angular/core';
import { GoalieAppearance } from '../state/appearances/goalie-appearance.model';
import { _ } from 'underscore';

interface RecentPerformanceReport {
  orderedAverageDiff: number;
  randomAverageDiff: number;
}

@Component({
  selector: 'app-recent-performance-prediction',
  templateUrl: './recent-performance-prediction.component.html',
  styleUrls: ['./recent-performance-prediction.component.scss']
})
export class RecentPerformancePredictionComponent implements OnInit {
  @Input() set appearances(appearances: GoalieAppearance[]) { this.onSetAppearances(appearances); }

  report: RecentPerformanceReport;

  private filteredAppearances: GoalieAppearance[]

  constructor() { }

  ngOnInit() {
  }

  onReroll(): void {
    this.report.randomAverageDiff = this.getAverageAppearanceDiff(_.shuffle(this.filteredAppearances));
  }

  private onSetAppearances(appearances: GoalieAppearance[]): void {
    this.filteredAppearances = appearances.filter(app => this.checkAppearanceHasEnoughShots(app));
    this.report = {
      orderedAverageDiff: this.getAverageAppearanceDiff(this.filteredAppearances),
      randomAverageDiff: this.getAverageAppearanceDiff(_.shuffle(this.filteredAppearances))
    }
    console.log(this.report);
  }

  private checkAppearanceHasEnoughShots(appearance: GoalieAppearance): boolean {
    return appearance.forms.reduce((shots, form) => shots + form.shots, 0) >= 16;
  }

  private getAverageAppearanceDiff(appearances: GoalieAppearance[]): number {
    return appearances.reduce((totalDiff, app, index) => {
      return this.reduceAppearanceSavePercDiff(totalDiff, appearances, index); 
    }, 0) / (appearances.length - 3);
  }

  private reduceAppearanceSavePercDiff(
    totalDiff: number,
    appearances: GoalieAppearance[],
    index: number
  ): number {
    if (index < 3) { return totalDiff; }
    const appearanceSvPerc = this.getSvPercFromAppearance(appearances[index]);
    const prevAppearanceSvPerc = [ appearances[index - 1], appearances[index - 2], appearances[index - 3]].reduce((total, app) => total += this.getSvPercFromAppearance(app), 0) / 3;
    return totalDiff + Math.abs(appearanceSvPerc - prevAppearanceSvPerc);
  }

  private getSvPercFromAppearance(appearance: GoalieAppearance): number {
    const shots = appearance.forms.reduce((shots, form) => shots + form.shots, 0);
    const goals = appearance.forms.reduce((goals, form) => goals + (form.goalAllowed ? 1 : 0), 0);
    return (shots - goals) / shots;
  }
}
