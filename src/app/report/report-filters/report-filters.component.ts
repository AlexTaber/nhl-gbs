import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSelectChange, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Goalie } from '../state/goalies/goalie.model';
import { UIReportStateQuery } from '../ui-state/ui-report-state.query';
import { YearOption } from '../ui-state/ui-report-state.model';
import { GoalieQuery } from '../state/goalies/goalie.query';
import { AppearanceFilterService } from '../state/appearance-filter/appearance-filter.service';

@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss']
})
export class ReportFiltersComponent implements OnInit {
  yearOptions$: Observable<YearOption[]> = this.uiQuery.yearOptions$;

  autocompleteControl = new FormControl();
  filteredGoalies$: Observable<Goalie[]>;

  constructor(
    private uiQuery: UIReportStateQuery,
    private filterService: AppearanceFilterService,
    private goalieQuery: GoalieQuery
  ) { }

  ngOnInit() {
    this.filteredGoalies$ = this.autocompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.formValueToString(value)),
        map(value => this.filter(value))
      );
  }

  onYearSelect(event: MatSelectChange): void {
    this.filterService.updateYear(event.value);
  }

  onGoalieSelect(event: MatAutocompleteSelectedEvent): void {
    const goalie: Goalie = event.option.value;
    const goalieId = !!goalie ? goalie.id : undefined;
    this.filterService.updateGoalieId(goalieId);
  }

  displayFn(goalie: Goalie | undefined) {
    return !!goalie ? goalie.fullName : '';
  }

  private filter(value: string ): Goalie[] {
    return !!value ? this.filterValidValue(value) : this.goalieQuery.getAll();
  }

  private filterValidValue(value: string): Goalie[] {
    const filterValue = value.toLowerCase();
    const goalies = this.goalieQuery.getAll();
    return goalies.filter(goalie => goalie.fullName.toLowerCase().includes(filterValue));
  }

  private formValueToString(value: string | Goalie | undefined) {
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'undefined') {
      return '';
    } else {
      return value.fullName;
    }
  }
}
