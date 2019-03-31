import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatButtonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavBarModule {
  constructor() {
    library.add(faQuestion, faGithub);
  }
}
