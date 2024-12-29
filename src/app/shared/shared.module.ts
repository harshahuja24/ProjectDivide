import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './side-panel/side-panel/side-panel.component';
import { BacklogComponent } from './backlog/backlog.component';



@NgModule({
  declarations: [
    SidePanelComponent,
    BacklogComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SidePanelComponent,
    BacklogComponent
  ]
})
export class SharedModule { }
