import { Component, OnInit, Input } from '@angular/core';
import { GoalieAppearance } from '../state/appearances/goalie-appearance.model';

interface AppearanceTotals {
  appearanceCount: number;
  shots: number;
  savePerc: number;
}

@Component({
  selector: 'app-report-totals',
  templateUrl: './report-totals.component.html',
  styleUrls: ['./report-totals.component.scss']
})
export class ReportTotalsComponent implements OnInit {
  @Input() set appearances(appearances: GoalieAppearance[]) { this.onSetAppearances(appearances); }

  appearanceTotals: AppearanceTotals;

  constructor() { }

  ngOnInit() {
  }

  private onSetAppearances(appearances: GoalieAppearance[]): void {
    const totalGoals = appearances.reduce((goals, app) => {
      return goals + app.forms.filter(form => form.goalAllowed).length;
    }, 0);
    const totalShots = appearances.reduce((shots, app) => {
      return shots + app.forms.reduce((formShots, form) => formShots + form.shots, 0)
    }, 0);
    this.appearanceTotals = {
      appearanceCount: appearances.length,
      shots: totalShots,
      savePerc: (totalShots - totalGoals) / totalShots
    }
  }
}
