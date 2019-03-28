import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameProjectionComponent } from './game-projection.component';

describe('GameProjectionComponent', () => {
  let component: GameProjectionComponent;
  let fixture: ComponentFixture<GameProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
