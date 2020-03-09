import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameloggerComponent } from './gamelogger.component';

describe('GameloggerComponent', () => {
  let component: GameloggerComponent;
  let fixture: ComponentFixture<GameloggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameloggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameloggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
