// backlog.component.ts
import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { SprintService } from '../services/sprint.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

interface Task {
  id: string;
  title: string;
  status: string;
  assignee: string;
  assigneeAvatar: string;
  priority: string;
  estimate: number;
  type: string;
}

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent {

  isTaskModalOpen=false;

  constructor(private employeeService:EmployeeService, private sprintService:SprintService ){}

  sprintForm=new FormGroup({ 
    sprintTitle:new FormControl(''),
    startDate:new FormControl(''),
    endDate:new FormControl(''),
    sprintDesc:new FormControl('')
  });

  activeSprint = {
    name: 'SCRUM Sprint 2',
    dateRange: '5 Dec - 12 Dec',
    issues: '2 issues',
    estimate: 10
  };

  activeSprintTasks: Task[] = [
    {
      id: 'SCRUM-1',
      title: 'Gather Changes and Updates',
      status: 'IN PROGRESS',
      assignee: 'HA',
      assigneeAvatar: 'assets/avatar-1.png',
      priority: 'High',
      estimate: 10,
      type: 'task'
    },
    {
      id: 'SCRUM-3',
      title: 'how to center a div',
      status: 'TO DO',
      assignee: 'SG',
      assigneeAvatar: 'assets/avatar-2.png',
      priority: 'Medium',
      estimate: 10,
      type: 'bug'
    }
  ];

  backlogTasks: Task[] = [
    {
      id: 'SCRUM-2',
      title: 'Changes and Updates',
      status: 'TO DO',
      assignee: 'SG',
      assigneeAvatar: 'assets/avatar-3.png',
      priority: 'Low',
      estimate: 5,
      type: 'story'
    },
    {
      id: 'SCRUM-5',
      title: 'figma',
      status: 'TO DO',
      assignee: 'HA',
      assigneeAvatar: 'assets/avatar-placeholder.png',
      priority: 'Medium',
      estimate: 5,
      type: 'task'
    }
  ];

  
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

  createSprint() {
    // Sprint creation logic
  }

  startSprint() {
    // Sprint start logic
  }

  // getAllBacklogTasks() {
  //   this.employeeService.getAllBacklogTasks().subscribe({
  //     next: (data) => {
  //       console.log(data);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching backlog tasks:', error);
  //     }
  //   });
  // }

  allSprints:any = [];

  getAllSprints() {
    this.sprintService.getAllSprints().subscribe({
      next: (data:any) => {
        console.log(data);
        this.allSprints = data;
      },
      error: (error:any) => {
        console.error('Error fetching sprints:', error);
      }
    });
  }

  submitSprint() {
    console.log('Sprint Form Value:', this.sprintForm.value);
    this.sprintService.createSprint(this.sprintForm.value).subscribe({
      next: (data:any) => {
        console.log('Sprint created successfully:', data);
        this.getAllSprints(); // Refresh the list of sprints
        this.sprintForm.reset(); // Reset the form after submission
        this.isTaskModalOpen = false; // Close the modal
      }
    })
  }
    
}