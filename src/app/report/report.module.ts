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
import { MatCardModule, MatProgressBarModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatStepperModule, MatListModule } from '@angular/material';
import { SectionModule } from '../section/section.module';
import { ReportLoadingComponent } from './report-loading/report-loading.component';
import { ReportSidenavComponent } from './report-sidenav/report-sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavBarModule } from '../navbar/navbar.module';
import { RecentPerformancePredictionComponent } from './recent-performance-prediction/recent-performance-prediction.component';
import { ReportInfoStepperComponent } from './report-info-stepper/report-info-stepper.component';
import { ReportInfoPremiseComponent } from './report-info-premise/report-info-premise.component';
import { ReportInfoTutorialComponent } from './report-info-tutorial/report-info-tutorial.component';
import { ReportInfoFindingsComponent } from './report-info-findings/report-info-findings.component';
import { ReportTheoryComponent } from './report-theory/report-theory.component';

@NgModule({
  declarations: [ReportComponent, GameProjectionComponent, FormSplitsComponent, ReportFiltersComponent, ReportTotalsComponent, ReportLoadingComponent, ReportSidenavComponent, RecentPerformancePredictionComponent, ReportInfoStepperComponent, ReportInfoPremiseComponent, ReportInfoTutorialComponent, ReportInfoFindingsComponent, ReportTheoryComponent],
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
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatStepperModule,
    MatListModule,
    SectionModule,
    FontAwesomeModule,
    NavBarModule
  ],
  exports: [
    ReportComponent
  ]
})
export class ReportModule {
  constructor() {
    library.add(faTimes);
  }
}
