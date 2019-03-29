import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { GoalieAppearance } from '../state/appearances/goalie-appearance.model';

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
  @Input() set appearances(appearances: GoalieAppearance[]) { this.onSetAppearances(appearances); }

  @ViewChild('chart') chart: GoogleChartComponent;

  formSplitReport: FormSplitReport;
  chartData: any[];
  chartColumns: string[];
  chartOptions: any = this.getChartOptions();

  constructor() { }

  ngOnInit() {
  }

  private onSetAppearances(appearances: GoalieAppearance[]): void {
    this.formSplitReport = appearances.reduce((splitReport: FormSplitReport, appearance: GoalieAppearance) => {
      this.updateSplitReportFromAppearance(splitReport, appearance);
      return splitReport;
    }, getInitialFormSplitReport());
    this.setChartData();
    this.setColumnsData();
  }

  private updateSplitReportFromAppearance(splitReport: FormSplitReport, appearance: GoalieAppearance): void {
    for (let i = 0; i < appearance.forms.length; i ++) { this.updateSplitReportFromFormIndex(splitReport, appearance, i); }
  }

  private updateSplitReportFromFormIndex(splitReport: FormSplitReport, appearance: GoalieAppearance, formIndex: number): void {
    const form = appearance.forms[formIndex];
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
