import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { GameProjectionComponent } from './game-projection/game-projection.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  declarations: [ReportComponent, GameProjectionComponent],
  imports: [
    CommonModule,
    Ng2GoogleChartsModule
  ],
  exports: [
    ReportComponent
  ]
})
export class ReportModule { }
