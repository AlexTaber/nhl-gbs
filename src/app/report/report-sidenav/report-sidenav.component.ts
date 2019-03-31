import { Component, OnInit } from '@angular/core';
import { UIReportStateService } from '../ui-state/ui-report-state.service';
import { GoalieAppearance } from '../state/appearances/goalie-appearance.model';

@Component({
  selector: 'app-report-sidenav',
  templateUrl: './report-sidenav.component.html',
  styleUrls: ['./report-sidenav.component.scss']
})
export class ReportSidenavComponent implements OnInit {
  singleGoalieAppearances: GoalieAppearance[];

  constructor(
    private uiService: UIReportStateService,
  ) { }

  ngOnInit() {
  }

  toggleSideNavOpen(): void {
    this.uiService.toggleSideNavOpen();
  }
}
