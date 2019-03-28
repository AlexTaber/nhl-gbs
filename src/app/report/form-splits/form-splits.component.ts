import { Component, OnInit, Input } from '@angular/core';
import { Report, Goalie, GoalieGame, GoalieForm } from '../state/report.model';

interface FormSplitReport {
  splits: FormSplit[]
}

interface FormSplit {
  shots: number;
  goals: number;
}

function getInitialFormSplitReport(): FormSplitReport {
  const splitCount = 4;
  const report = { splits: [] };
  for (let i = 0; i < splitCount; i ++) { report.splits.push({ shots: 0, goals: 0 }) }
  return report;
}

@Component({
  selector: 'app-form-splits',
  templateUrl: './form-splits.component.html',
  styleUrls: ['./form-splits.component.scss']
})
export class FormSplitsComponent implements OnInit {
  @Input() set report(report: Report) { this.onSetReport(report); }

  formSplitReport: FormSplitReport;
  chartData: any[];
  chartColumns: string[];

  constructor() { }

  ngOnInit() {
  }

  private onSetReport(report: Report): void {
    this.formSplitReport = report.goalies.reduce((splitReport: FormSplitReport, goalie: Goalie) => {
      this.updateSplitReportFromGames(splitReport, goalie.games);
      return splitReport;
    }, getInitialFormSplitReport());
    this.setChartData(report);
    this.setColumnsData();
  }

  private updateSplitReportFromGames(splitReport: FormSplitReport, games: GoalieGame[]): void {
    for (let game of games) { this.updateSplitReportFromGame(splitReport, game); }
  }

  private updateSplitReportFromGame(splitReport: FormSplitReport, game: GoalieGame): void {
    for (let i = 0; i < game.forms.length; i ++) { this.updateSplitReportFromFormIndex(splitReport, game, i); }
  }

  private updateSplitReportFromFormIndex(splitReport: FormSplitReport, game: GoalieGame, formIndex: number): void {
    const form = game.forms[formIndex];
    const split = splitReport.splits[formIndex];
    if (!!split) {
      splitReport.splits[formIndex].shots += form.shots;
      splitReport.splits[formIndex].goals += form.goalAllowed ? 1 : 0;
    }
  }

  private setChartData(report: Report): void {
    this.chartData = this.formSplitReport.splits.map((split, index) => {
      return [ `After Goal ${index} though Goal ${index + 1} (if any)`, this.getChartDataItem(split, report) ]
    });
  }

  private getChartDataItem(split: FormSplit, report: Report): number {
    const totalOtherShots = report.totalShots - split.shots;
    const totalOtherGoals = report.totalGoalsAgainst - split.goals;
    return ((split.shots - split.goals) / split.shots) - ((totalOtherShots - totalOtherGoals) / totalOtherShots);
  }

  private setColumnsData(): void {
    this.chartColumns = [ 'Between Goals', 'Save %' ]
  }
}
