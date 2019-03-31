import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GoalieForm, GoalieAppearance } from '../state/appearances/goalie-appearance.model';
import { GoalieAppearanceQuery } from '../state/appearances/goalie-appearance.query';

@Component({
  selector: 'app-report-info-tutorial',
  templateUrl: './report-info-tutorial.component.html',
  styleUrls: ['./report-info-tutorial.component.scss']
})
export class ReportInfoTutorialComponent implements OnInit {
  @Output() close: EventEmitter<undefined> = new EventEmitter<undefined>();

  step = 0;
  exampleSplitReportAppearances: GoalieAppearance[];
  exampleProjectionReportAppearances: GoalieAppearance[];
  example
  exampleFormsJson: string;

  constructor(
    private appearancesQuery: GoalieAppearanceQuery
  ) { }

  ngOnInit() {
    this.setExampleFormsJson();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onClose(): void {
    this.close.emit();
  }

  private setExampleFormsJson(): void {
    const forms: GoalieForm[] = [
      {
        shots: 15,
        goalAllowed: true
      },

      {
        shots: 11,
        goalAllowed: true
      },

      {
        shots: 8,
        goalAllowed: true
      },

      {
        shots: 2,
        goalAllowed: true
      },

      {
        shots: 4,
        goalAllowed: false
      }
    ];

    this.exampleProjectionReportAppearances = this.appearancesQuery.getAll().filter(app => app.gamePk.toString().slice(0, 4) === '2017');
    this.exampleSplitReportAppearances = [
      {
        id: 'test',
        gamePk: 123,
        goalieId: 123,
        forms,
        isComingOffBench: false,
        teamId: 123
      }
    ]
    this.exampleFormsJson = JSON.stringify(forms, undefined, 2);
  }
}
