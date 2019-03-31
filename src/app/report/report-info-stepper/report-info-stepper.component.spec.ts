import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInfoStepperComponent } from './report-info-stepper.component';

describe('ReportInfoStepperComponent', () => {
  let component: ReportInfoStepperComponent;
  let fixture: ComponentFixture<ReportInfoStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportInfoStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInfoStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
