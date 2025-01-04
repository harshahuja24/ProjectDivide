import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './side-panel/side-panel/side-panel.component';
import { BacklogComponent } from './backlog/backlog.component';
import { ViewAllKanbanComponent } from './view-all-kanban/view-all-kanban.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    SidePanelComponent,
    BacklogComponent,
    ViewAllKanbanComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularEditorModule
  ],
  exports:[
    SidePanelComponent,
    BacklogComponent,
    ViewAllKanbanComponent
  ]
})
export class SharedModule { }
