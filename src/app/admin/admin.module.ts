import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { FormBuilder, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    CreateProjectComponent,
    AssignTaskComponent,
    AdminDashboardComponent,
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  exports:[
    CreateProjectComponent,
    CreateEmployeeComponent
  ]
})
export class AdminModule {
  
 }
