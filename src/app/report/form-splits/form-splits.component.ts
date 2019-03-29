import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Goalie, GoalieGame } from '../state/report.model';
import { GoogleChartComponent } from 'angular-google-charts';

interface FormSplitReport {
  splits: FormSplit[];
  totalShots: number;
  totalGoals: number;
}

interface FormSplit {
  shots: number;
  goals: number;
}

function getInitialFormSplitReport(): FormSplitReport {
  const splitCount = 4;
  const report = { splits: [], totalGoals: 0, totalShots: 0 };
  for (let i = 0; i < splitCount; i ++) { report.splits.push({ shots: 0, goals: 0 }) }
  return report;
}

@Component({
  selector: 'app-form-splits',
  templateUrl: './form-splits.component.html',
  styleUrls: ['./form-splits.component.scss']
})
export class FormSplitsComponent implements OnInit {
  @Input() set goalies(goalies: Goalie[]) { this.onSetGoalies(goalies); }
  @Input() set selectedGoalie(goalie: Goalie | undefined) { this.onSetSelectedGoalie(goalie); }

  @ViewChild('chart') chart: GoogleChartComponent;

  formSplitReport: FormSplitReport;
  chartData: any[];
  chartColumns: string[];
  chartOptions: any = this.getChartOptions();

  constructor() { }

  ngOnInit() {
  }

  private onSetGoalies(goalies: Goalie[]): void {
    this.formSplitReport = goalies.reduce((splitReport: FormSplitReport, goalie: Goalie) => {
      this.updateSplitReportFromGames(splitReport, goalie.games);
      return splitReport;
    }, getInitialFormSplitReport());
    this.setChartData();
    this.setColumnsData();
  }

  private onSetSelectedGoalie(goalie: Goalie | undefined): void {
    if (!!goalie) {
      this.formSplitReport = getInitialFormSplitReport();
      this.updateSplitReportFromGames(this.formSplitReport, goalie.games);
      this.setChartData();
      this.chart.wrapper.draw();
    }
  }

  private updateSplitReportFromGames(splitReport: FormSplitReport, games: GoalieGame[]): void {
    for (let game of games) { this.updateSplitReportFromGame(splitReport, game); }
  }

  private updateSplitReportFromGame(splitReport: FormSplitReport, game: GoalieGame): void {
    for (let i = 0; i < game.forms.length; i ++) { this.updateSplitReportFromFormIndex(splitReport, game, i); }
  }

  private updateSplitReportFromFormIndex(splitReport: FormSplitReport, game: GoalieGame, formIndex: number): void {
    const form = game.forms[formIndex];
    splitReport.totalGoals += form.goalAllowed ? 1 : 0;
    splitReport.totalShots += form.shots;
    const split = splitReport.splits[formIndex];
    if (!!split) {
      splitReport.splits[formIndex].shots += form.shots;
      splitReport.splits[formIndex].goals += form.goalAllowed ? 1 : 0;
    }
  }

  private setChartData(): void {
    this.chartData = this.formSplitReport.splits.map((split, index) => {
      return [ `After Goal ${index} though Goal ${index + 1} (if any)`, this.getChartDataItem(split) ]
    });
  }

  private getChartDataItem(split: FormSplit): number {
    const totalOtherShots = this.formSplitReport.totalShots - split.shots;
    const totalOtherGoals = this.formSplitReport.totalGoals - split.goals;
    return ((split.shots - split.goals) / split.shots) - ((totalOtherShots - totalOtherGoals) / totalOtherShots);
  }

  private setColumnsData(): void {
    this.chartColumns = [ 'Between Goals', 'Save %' ]
  }

  private getChartOptions(): any {
    return {
      vAxis: {
        minValue: -0.02,
        maxValue: 0.02
      }
    }
  }
}
