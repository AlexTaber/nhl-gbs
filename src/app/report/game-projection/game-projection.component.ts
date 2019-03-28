import { Component, OnInit, Input } from '@angular/core';
import { Goalie, GoalieGame, GoalieForm, Report } from '../state/report.model';

function getInitalProjectionData(): ProjectionData {
  const goalsToTrack = [ 1, 2, 3 ];
  return { dataPoints: getDataPoints(goalsToTrack), goalsToTrack: goalsToTrack };
}

function getDataPoints(goalsToTrack: number[]): ProjectionDataPoint[] {
  const shotRange = 3;
  const maxShotCount = 28;
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
  @Input() set report(report: Report) { this.onSetReport(report); }

  projectionData: ProjectionData;
  chartData: any;
  columnNames: any[];

  constructor() { }

  ngOnInit() {}

  private onSetReport(report: Report) {
    this.projectionData = report.goalies.reduce((projectionData: ProjectionData, goalie: Goalie) => {
      return this.reduceProjectionDataFromGoalie(projectionData, goalie);
    }, getInitalProjectionData()),
    this.setChartData(report);
  }

  private reduceProjectionDataFromGoalie(projectionData: ProjectionData, goalie: Goalie): ProjectionData {
    return goalie.games.reduce((projectionData: ProjectionData, game: GoalieGame) => {
      this.updateDataPointByGame(projectionData, game);
      return projectionData;
    }, projectionData);
  }

  private updateDataPointByGame(projectionData: ProjectionData, game: GoalieGame): void {
    for (let i = 0; i < projectionData.goalsToTrack.length; i ++) {
      this.updateDataPointByGoalIndex(projectionData, game, i);
    }
  }

  private updateDataPointByGoalIndex(
    projectionData: ProjectionData,
    game: GoalieGame,
    goalIndex: number
  ): void {
    const goal = projectionData.goalsToTrack[goalIndex];
    const dataPoint = this.findDataPointToUpdateFromFormIndex(projectionData, game, goal - 1);
    if (!!dataPoint) {
      let item: ProjectionDataPointItem = dataPoint.items[goalIndex];
      const remainingForms = game.forms.slice(goal, game.forms.length);
      item.shotsAfter += remainingForms.reduce((shots, form) => shots += form.shots, 0);
      item.goalsAfter += remainingForms.reduce((goals, form) => form.goalAllowed ? goals + 1 : goals, 0);
    }
  }

  private findDataPointToUpdateFromFormIndex(
    projectionData: ProjectionData,
    game: GoalieGame,
    formIndex: number
  ): ProjectionDataPoint | undefined {
    const form = game.forms[formIndex];
    return !!form ? projectionData.dataPoints.find(dataPoint => this.isCorrectDataPoint(game, dataPoint, formIndex)) : undefined;
  }

  private isCorrectDataPoint(game: GoalieGame, dataPoint: ProjectionDataPoint, formIndex: number): boolean {
    const priorForms = game.forms.slice(0, formIndex + 1);
    const totalShots = priorForms.reduce((total, form) => total += form.shots, 0);
    const form = game.forms[formIndex];
    const isUnderMaxShots = dataPoint.includeGreaterThan || totalShots <= dataPoint.maxShotCount;
    return form.goalAllowed && totalShots >= dataPoint.minShotCount && isUnderMaxShots;
  }

  private setChartData(report: Report): void {
    this.columnNames = this.getChartColumns();
    this.chartData = [
      ...this.projectionData.dataPoints.map((dataPoint: ProjectionDataPoint) => {
        return [
          this.getChartDataPointLabel(dataPoint),
          ...dataPoint.items.map(item => this.getChartDataPointData(item, report))
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

  private getChartDataPointData(item: ProjectionDataPointItem, report: Report): number {
    const value = ((item.shotsAfter - item.goalsAfter) / item.shotsAfter);
    return item.shotsAfter > (report.totalShots * 0.01) ? value : null;
  }
}
