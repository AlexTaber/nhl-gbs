import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPerformancePredictionComponent } from './recent-performance-prediction.component';

describe('RecentPerformancePredictionComponent', () => {
  let component: RecentPerformancePredictionComponent;
  let fixture: ComponentFixture<RecentPerformancePredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentPerformancePredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPerformancePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
