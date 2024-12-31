import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './admin/create-employee/create-employee.component';
import { CreateTaskComponent } from './admin/create-task/create-task.component';
import { CreateProjectComponent } from './admin/create-project/create-project.component';
import { ViewAllKanbanComponent } from './shared/view-all-kanban/view-all-kanban.component';

const routes: Routes = [
  {
    path:"create-employee",
    component:CreateEmployeeComponent
  },
  {
    path:"create-task",
    component:CreateTaskComponent
  },
  {
    path:"create-project",
    component:CreateProjectComponent
  },
  {
    path:"view-all-kanban",
    component:ViewAllKanbanComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
