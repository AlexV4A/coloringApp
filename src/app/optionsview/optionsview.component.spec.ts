import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsviewComponent } from './optionsview.component';

describe('OptionsviewComponent', () => {
  let component: OptionsviewComponent;
  let fixture: ComponentFixture<OptionsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
