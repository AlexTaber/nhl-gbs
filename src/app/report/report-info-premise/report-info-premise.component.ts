import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GoalieAppearance } from '../state/appearances/goalie-appearance.model';
import { GoalieAppearanceQuery } from '../state/appearances/goalie-appearance.query';
import { GoalieQuery } from '../state/goalies/goalie.query';

@Component({
  selector: 'app-report-info-premise',
  templateUrl: './report-info-premise.component.html',
  styleUrls: ['./report-info-premise.component.scss']
})
export class ReportInfoPremiseComponent implements OnInit {
  @Output() close: EventEmitter<undefined> = new EventEmitter<undefined>();

  step = 0;
  singleGoalieAppearances: GoalieAppearance[];

  constructor(
    private appearanceQuery: GoalieAppearanceQuery,
    private goalieQuery: GoalieQuery
  ) { }

  ngOnInit() {
    this.setAppearances();
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

  private setAppearances(): void {
    const selectedGoalie = this.goalieQuery.getAll().find(goalie => goalie.fullName === 'Petr Mrazek');
    this.singleGoalieAppearances = this.appearanceQuery.getAll().filter(app => app.goalieId === selectedGoalie.id && app.gamePk.toString().slice(0, 4) === '2018');
  }
}
