import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInfoTutorialComponent } from './report-info-tutorial.component';

describe('ReportInfoTutorialComponent', () => {
  let component: ReportInfoTutorialComponent;
  let fixture: ComponentFixture<ReportInfoTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportInfoTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInfoTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
