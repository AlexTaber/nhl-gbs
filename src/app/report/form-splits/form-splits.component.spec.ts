import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSplitsComponent } from './form-splits.component';

describe('FormSplitsComponent', () => {
  let component: FormSplitsComponent;
  let fixture: ComponentFixture<FormSplitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSplitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSplitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
