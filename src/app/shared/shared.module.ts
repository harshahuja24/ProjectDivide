import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './side-panel/side-panel/side-panel.component';
import { BacklogComponent } from './backlog/backlog.component';
import { ViewAllKanbanComponent } from './view-all-kanban/view-all-kanban.component';



@NgModule({
  declarations: [
    SidePanelComponent,
    BacklogComponent,
    ViewAllKanbanComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SidePanelComponent,
    BacklogComponent,
    ViewAllKanbanComponent
  ]
})
export class SharedModule { }
