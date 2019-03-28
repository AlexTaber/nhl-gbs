import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { GameProjectionComponent } from './game-projection/game-projection.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [ReportComponent, GameProjectionComponent],
  imports: [
    CommonModule,
    GoogleChartsModule.forRoot(),
  ],
  exports: [
    ReportComponent
  ]
})
export class ReportModule { }
