import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartboardComponent } from './chartboard.component';

describe('ChartboardComponent', () => {
  let component: ChartboardComponent;
  let fixture: ComponentFixture<ChartboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
