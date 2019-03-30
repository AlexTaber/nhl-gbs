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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReportTotalsComponent } from './report-totals/report-totals.component';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { SectionModule } from '../section/section.module';
import { ReportLoadingComponent } from './report-loading/report-loading.component';

@NgModule({
  declarations: [ReportComponent, GameProjectionComponent, FormSplitsComponent, ReportFiltersComponent, ReportTotalsComponent, ReportLoadingComponent],
  imports: [
    CommonModule,
    GoogleChartsModule.forRoot(),
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressBarModule,
    SectionModule
  ],
  exports: [
    ReportComponent
  ]
})
export class ReportModule { }
