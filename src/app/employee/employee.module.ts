import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CalenderComponentComponent } from './calender-component/calender-component.component';
import { KanbanComponent } from './kanban-component/kanban-component.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';



@NgModule({
  declarations: [
    CreateTaskComponent,
    CalenderComponentComponent,
    KanbanComponent,
    MyTasksComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ]
})
export class EmployeeModule { }
