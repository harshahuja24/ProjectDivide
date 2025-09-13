import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './admin/create-employee/create-employee.component';
import { CreateTaskComponent } from './admin/create-task/create-task.component';
import { CreateProjectComponent } from './admin/create-project/create-project.component';
import { ViewAllKanbanComponent } from './shared/view-all-kanban/view-all-kanban.component';
import { KanbanComponent } from './employee/kanban-component/kanban-component.component';
import { BacklogComponent } from './shared/backlog/backlog.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';

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
  },
  {
    path:"my-kanban",
    component:KanbanComponent
  },
  {
    path:"backlog",
    component:BacklogComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"",
    component:DashboardComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent
  },
  {
    path:"analytics",
    component:AnalyticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
