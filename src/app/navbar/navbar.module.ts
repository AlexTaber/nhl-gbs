import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavBarModule {}
