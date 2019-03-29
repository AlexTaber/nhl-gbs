import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { SectionContentComponent } from './section-content/section-content.component';
import { SectionHeaderComponent } from './section-header/section-header.component';

@NgModule({
  declarations: [
    SectionComponent,
    SectionContentComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SectionComponent,
    SectionContentComponent,
    SectionHeaderComponent
  ]
})
export class SectionModule { }
