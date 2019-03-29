import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { GoalieAppearance } from '../state/appearances/goalie-appearance.model';

function getInitalProjectionData(): ProjectionData {
  const goalsToTrack = [ 1, 2, 3 ];
  return { dataPoints: getDataPoints(goalsToTrack), goalsToTrack: goalsToTrack, totalGoalsAgainst: 0, totalShots: 0 };
}

function getDataPoints(goalsToTrack: number[]): ProjectionDataPoint[] {
  const shotRange = 5;
  const maxShotCount = 32;
  const dataPointCount = Math.floor(maxShotCount / shotRange);
  const data: ProjectionDataPoint[] = [];
  for (let i = 0; i < dataPointCount; i ++) {
    data.push({
      minShotCount: 1 + (i * shotRange),
      maxShotCount: i < dataPointCount - 1 ? shotRange + (i * shotRange) : undefined,
      includeGreaterThan: i === dataPointCount - 1,
      items: goalsToTrack.map(() => {
        return { shotsAfter: 0, goalsAfter: 0 }
      })
    })
  }
  return data;
}

interface ProjectionData {
  dataPoints: ProjectionDataPoint[];
  goalsToTrack: number[];
  totalShots: number;
  totalGoalsAgainst: number;
}

interface ProjectionDataPoint {
  minShotCount: number;
  maxShotCount?: number;
  includeGreaterThan?: boolean;
  items: ProjectionDataPointItem[];
}

interface ProjectionDataPointItem {
  shotsAfter: number;
  goalsAfter: number;
}

@Component({
  selector: 'app-game-projection',
  templateUrl: './game-projection.component.html',
  styleUrls: ['./game-projection.component.scss']
})
export class GameProjectionComponent implements OnInit {
  @Input() set appearances(appearances: GoalieAppearance[]) { this.onSetAppearances(appearances); }

  @ViewChild('chart') chart: GoogleChartComponent;

  projectionData: ProjectionData;
  chartData: any;
  columnNames: any[];
  chartOptions: any = this.getChartOptions();

  constructor() { }

  ngOnInit() {}

  private onSetAppearances(appearances: GoalieAppearance[]): void {
    this.projectionData = appearances.reduce((projectionData: ProjectionData, appearance: GoalieAppearance) => {
      this.updateDataPointByGame(projectionData, appearance);
      this.updateShotTotalsByGame(projectionData, appearance);
      return projectionData;
    }, getInitalProjectionData()),
    this.setChartData();
  }

  private updateDataPointByGame(projectionData: ProjectionData, appearance: GoalieAppearance): void {
    for (let i = 0; i < projectionData.goalsToTrack.length; i ++) {
      this.updateDataPointByGoalIndex(projectionData, appearance, i);
    }
  }

  private updateDataPointByGoalIndex(
    projectionData: ProjectionData,
    appearance: GoalieAppearance,
    goalIndex: number
  ): void {
    const goal = projectionData.goalsToTrack[goalIndex];
    const dataPoint = this.findDataPointToUpdateFromFormIndex(projectionData, appearance, goal - 1);
    if (!!dataPoint) {
      let item: ProjectionDataPointItem = dataPoint.items[goalIndex];
      const remainingForms = appearance.forms.slice(goal, appearance.forms.length);
      item.shotsAfter += remainingForms.reduce((shots, form) => shots += form.shots, 0);
      item.goalsAfter += remainingForms.reduce((goals, form) => form.goalAllowed ? goals + 1 : goals, 0);
    }
  }

  private findDataPointToUpdateFromFormIndex(
    projectionData: ProjectionData,
    appearance: GoalieAppearance,
    formIndex: number
  ): ProjectionDataPoint | undefined {
    const form = appearance.forms[formIndex];
    return !!form ? projectionData.dataPoints.find(dataPoint => this.isCorrectDataPoint(appearance, dataPoint, formIndex)) : undefined;
  }

  private isCorrectDataPoint(
    appearance: GoalieAppearance,
    dataPoint: ProjectionDataPoint,
    formIndex: number
  ): boolean {
    const priorForms = appearance.forms.slice(0, formIndex + 1);
    const totalShots = priorForms.reduce((total, form) => total += form.shots, 0);
    const form = appearance.forms[formIndex];
    const isUnderMaxShots = dataPoint.includeGreaterThan || totalShots <= dataPoint.maxShotCount;
    return form.goalAllowed && totalShots >= dataPoint.minShotCount && isUnderMaxShots;
  }

  private setChartData(): void {
    this.columnNames = this.getChartColumns();
    this.chartData = [
      ...this.projectionData.dataPoints.map((dataPoint: ProjectionDataPoint) => {
        return [
          this.getChartDataPointLabel(dataPoint),
          ...dataPoint.items.map(item => this.getChartDataPointData(item))
        ];
      })
    ];
  }

  private getChartColumns(): any[] {
    return [
      'Shot Range of Goal',
      ...this.projectionData.goalsToTrack.map(goal => `Save % After ${goal} Goals`)
    ]
  }

  private getChartDataPointLabel(dataPoint: ProjectionDataPoint): string {
    let label = String(dataPoint.minShotCount);
    if (dataPoint.includeGreaterThan) { label += '+'; }
    if (!!dataPoint.maxShotCount && dataPoint.maxShotCount !== dataPoint.minShotCount) { label += `-${dataPoint.maxShotCount}`}
    return label;
  }

  private getChartDataPointData(item: ProjectionDataPointItem): number {
    const value = ((item.shotsAfter - item.goalsAfter) / item.shotsAfter) - ((this.projectionData.totalShots - this.projectionData.totalGoalsAgainst) / this.projectionData.totalShots);
    return item.shotsAfter > (this.projectionData.totalShots * (0.025 / this.projectionData.dataPoints.length)) ? value : null;
  }

  private getChartOptions(): any {
    return {
      vAxis: {
        minValue: -0.02,
        maxValue: 0.02
      }
    }
  }

  private updateShotTotalsByGame(projectionData: ProjectionData, appearance: GoalieAppearance): void {
    projectionData.totalGoalsAgainst += appearance.forms.reduce((goals, form) => form.goalAllowed ? goals + 1 : goals, 0);
    projectionData.totalShots += appearance.forms.reduce((shots, form) => shots + form.shots, 0);
  }
}
