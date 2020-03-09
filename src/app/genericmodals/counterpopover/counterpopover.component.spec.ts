import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterpopoverComponent } from './counterpopover.component';

describe('CounterpopoverComponent', () => {
  let component: CounterpopoverComponent;
  let fixture: ComponentFixture<CounterpopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterpopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterpopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
