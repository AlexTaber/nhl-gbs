import { Component, OnInit, Input } from '@angular/core';
import { UIReportQuery } from '../ui-state/ui-report.query';
import { Observable } from 'rxjs';
import { YearOption, YearOptionValue, GoalieOptionValue } from '../ui-state/ui-report.model';
import { MatSelectChange, MatAutocompleteSelectedEvent } from '@angular/material';
import { UIReportService } from '../ui-state/ui-report.service';
import { ReportService } from '../state/report.service';
import { Goalie } from '../state/report.model';
import { ReportQuery } from '../state/report.query';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss']
})
export class ReportFiltersComponent implements OnInit {
  yearOptions$: Observable<YearOption[]> = this.uiQuery.yearOptions$;
  selectedYear$: Observable<YearOptionValue> = this.uiQuery.selectedYear$;

  autocompleteControl = new FormControl();
  filteredGoalies$: Observable<Goalie[]>;

  constructor(
    private uiQuery: UIReportQuery,
    private uiService: UIReportService,
    private reportService: ReportService,
    private reportQuery: ReportQuery
  ) { }

  ngOnInit() {
    this.filteredGoalies$ = this.autocompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || !value ? value : value.fullName),
        map(value => this.filter(value))
      );
  }

  onYearSelect(event: MatSelectChange): void {
    this.uiService.updateSelectedYear(event.value);
    this.reportService.setLocalReport(event.value);
  }

  onGoalieSelect(event: MatAutocompleteSelectedEvent): void {
    const goalie = event.option.value;
    this.uiService.updateSelectedGoalie(goalie);
  }

  displayFn(goalie: Goalie | undefined) {
    return !!goalie ? goalie.fullName : '';
  }

  private filter(value: string ): Goalie[] {
    return !!value ? this.filterValidValue(value) : this.reportQuery.getActive().goalies;
  }

  private filterValidValue(value: string): Goalie[] {
    const filterValue = value.toLowerCase();
    const goalies = this.reportQuery.getActive().goalies;
    return goalies.filter(goalie => goalie.fullName.toLowerCase().includes(filterValue));
  }
}
