import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { GameProjectionComponent } from './game-projection/game-projection.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { FormSplitsComponent } from './form-splits/form-splits.component';
import { ReportFiltersComponent } from './report-filters/report-filters.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ReportComponent, GameProjectionComponent, FormSplitsComponent, ReportFiltersComponent],
  imports: [
    CommonModule,
    GoogleChartsModule.forRoot(),
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    ReportComponent
  ]
})
export class ReportModule { }
