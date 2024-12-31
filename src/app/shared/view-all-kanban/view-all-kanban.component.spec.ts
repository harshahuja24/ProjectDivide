import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllKanbanComponent } from './view-all-kanban.component';

describe('ViewAllKanbanComponent', () => {
  let component: ViewAllKanbanComponent;
  let fixture: ComponentFixture<ViewAllKanbanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllKanbanComponent]
    });
    fixture = TestBed.createComponent(ViewAllKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
