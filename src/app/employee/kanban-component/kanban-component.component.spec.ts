import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanComponentComponent } from './kanban-component.component';

describe('KanbanComponentComponent', () => {
  let component: KanbanComponentComponent;
  let fixture: ComponentFixture<KanbanComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KanbanComponentComponent]
    });
    fixture = TestBed.createComponent(KanbanComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
