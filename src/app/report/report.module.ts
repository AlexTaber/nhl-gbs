import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { GameProjectionComponent } from './game-projection/game-projection.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { FormSplitsComponent } from './form-splits/form-splits.component';
import { ReportFiltersComponent } from './report-filters/report-filters.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReportComponent, GameProjectionComponent, FormSplitsComponent, ReportFiltersComponent],
  imports: [
    CommonModule,
    GoogleChartsModule.forRoot(),
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReportComponent
  ]
})
export class ReportModule { }
