import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSidenavComponent } from './report-sidenav.component';

describe('ReportSidenavComponent', () => {
  let component: ReportSidenavComponent;
  let fixture: ComponentFixture<ReportSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
