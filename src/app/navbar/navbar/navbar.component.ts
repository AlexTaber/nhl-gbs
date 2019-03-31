import { Component, OnInit } from '@angular/core';
import { UIReportStateService } from 'src/app/report/ui-state/ui-report-state.service';
import { UIReportStateQuery } from 'src/app/report/ui-state/ui-report-state.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  fetching$: Observable<boolean> = this.uiQuery.fetching$;

  constructor(
    private uiService: UIReportStateService,
    private uiQuery: UIReportStateQuery
  ) { }

  ngOnInit() {
  }

  toggleSideNavOpen(): void {
    this.uiService.toggleSideNavOpen();
  }
}
