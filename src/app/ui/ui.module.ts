import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionRowComponent } from './action-row/action-row.component';
import { SectionComponent } from './section/section.component';
import { SectionContentComponent } from './section-content/section-content.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { MatToolbarModule, MatInputModule, MatSelectModule, MatAutocompleteModule, MatCheckboxModule, MatCardModule, MatProgressBarModule, MatSidenavModule, MatButtonModule, MatExpansionModule, MatStepperModule, MatListModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [
    ActionRowComponent,
    SectionComponent,
    SectionContentComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
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
    MatIconModule,
    FontAwesomeModule
  ],
  exports: [
    ActionRowComponent,
    SectionComponent,
    SectionContentComponent,
    SectionHeaderComponent,
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
    MatIconModule,
    FontAwesomeModule
  ]
})
export class UiModule {
  constructor() {
    library.add(faTimes, faQuestion, faGithub);
  }
}
