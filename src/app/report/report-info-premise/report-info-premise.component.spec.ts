import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInfoPremiseComponent } from './report-info-premise.component';

describe('ReportInfoPremiseComponent', () => {
  let component: ReportInfoPremiseComponent;
  let fixture: ComponentFixture<ReportInfoPremiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportInfoPremiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInfoPremiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
