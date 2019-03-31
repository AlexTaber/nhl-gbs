import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInfoFindingsComponent } from './report-info-findings.component';

describe('ReportInfoFindingsComponent', () => {
  let component: ReportInfoFindingsComponent;
  let fixture: ComponentFixture<ReportInfoFindingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportInfoFindingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInfoFindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
