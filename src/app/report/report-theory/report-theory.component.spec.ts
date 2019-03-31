import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTheoryComponent } from './report-theory.component';

describe('ReportTheoryComponent', () => {
  let component: ReportTheoryComponent;
  let fixture: ComponentFixture<ReportTheoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTheoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTheoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
