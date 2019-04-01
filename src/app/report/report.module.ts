import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { GameProjectionComponent } from './game-projection/game-projection.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { FormSplitsComponent } from './form-splits/form-splits.component';
import { ReportFiltersComponent } from './report-filters/report-filters.component';
import { ReportTotalsComponent } from './report-totals/report-totals.component';
import { ReportLoadingComponent } from './report-loading/report-loading.component';
import { ReportSidenavComponent } from './report-sidenav/report-sidenav.component';
import { NavBarModule } from '../navbar/navbar.module';
import { RecentPerformancePredictionComponent } from './recent-performance-prediction/recent-performance-prediction.component';
import { ReportInfoStepperComponent } from './report-info-stepper/report-info-stepper.component';
import { ReportInfoPremiseComponent } from './report-info-premise/report-info-premise.component';
import { ReportInfoTutorialComponent } from './report-info-tutorial/report-info-tutorial.component';
import { ReportInfoFindingsComponent } from './report-info-findings/report-info-findings.component';
import { ReportTheoryComponent } from './report-theory/report-theory.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [ReportComponent, GameProjectionComponent, FormSplitsComponent, ReportFiltersComponent, ReportTotalsComponent, ReportLoadingComponent, ReportSidenavComponent, RecentPerformancePredictionComponent, ReportInfoStepperComponent, ReportInfoPremiseComponent, ReportInfoTutorialComponent, ReportInfoFindingsComponent, ReportTheoryComponent],
  imports: [
    CommonModule,
    GoogleChartsModule.forRoot(),
    UiModule,
    NavBarModule
  ],
  exports: [
    ReportComponent
  ]
})
export class ReportModule {
}
