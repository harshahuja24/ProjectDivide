import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderComponentComponent } from './calender-component.component';

describe('CalenderComponentComponent', () => {
  let component: CalenderComponentComponent;
  let fixture: ComponentFixture<CalenderComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalenderComponentComponent]
    });
    fixture = TestBed.createComponent(CalenderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
