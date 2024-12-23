import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent {
  
  isTaskModalOpen = false;

  assignTaskForm = new FormGroup({
    taskName: new FormControl('',[Validators.required]),
    taskProject: new FormControl('',[Validators.required]),
    taskDescription: new FormControl('',[Validators.required]),
    taskDeadline: new FormControl('',[Validators.required]),
    taskAssignedTo: new FormControl('',[Validators.required]),
    taskStatus: new FormControl('',[Validators.required])
  });

  config = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter quest description here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      { name: "quote", class: "quote" },
      { name: 'redText', class: 'redText' },
      { name: "titleText", class: "titleText", tag: "h1" }
    ]
  };

  submitTask(){
    console.log(this.assignTaskForm.value);
  }
}