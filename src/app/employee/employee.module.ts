import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { CalenderComponentComponent } from './calender-component/calender-component.component';
import { KanbanComponent } from './kanban-component/kanban-component.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';



@NgModule({
  declarations: [
    CreateTaskComponent,
    EmployeeDashboardComponent,
    CalenderComponentComponent,
    KanbanComponent,
    MyTasksComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmployeeModule { }
