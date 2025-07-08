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

  ngOnInit() {
    this.getAllSprints();
  }

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
getStatusBadgeClass(status: string): string {
  switch(status) {
    case 'TODO': return 'bg-secondary';
    case 'IN PROGRESS': return 'bg-warning';
    case 'DONE': return 'bg-success';
    default: return 'bg-primary';
  }
}

getCompletedTasks(taskList: any[]): number {
  return taskList.filter(task => task.taskStatus === 'DONE').length;
}

getStatusClass(status: string): string {
  switch(status) {
    case 'TODO': return 'todo';
    case 'IN PROGRESS': return 'progress';
    case 'DONE': return 'done';
    default: return 'todo';
  }
}
getDuration(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

getStatusIcon(status: string): string {
  switch(status) {
    case 'TODO': return 'fa-circle';
    case 'IN PROGRESS': return 'fa-clock';
    case 'DONE': return 'fa-check-circle';
    default: return 'fa-circle';
  }
}


editTask(taskId: number) {
  console.log('Editing task:', taskId);
  // Add your edit logic here
}

getInitials(assignedTo: number): string {
  // You can replace this with actual user name lookup
  return `U${assignedTo}`;
}


deleteTask(taskId: number) {
  console.log('Deleting task:', taskId);
  // Add your task deletion logic here
}
allSprints:any = [];


getAllSprints() {
  this.sprintService.getAllSprints().subscribe({
    next: (sprints: any[]) => {
      console.log('Raw sprints data:', sprints); // Debug: see the actual structure
      
      // Initialize each sprint with empty taskList
      sprints.forEach(sprint => {
        sprint.taskList = [];
        console.log('Sprint object:', sprint); // Debug: see each sprint's properties
      });
      
      this.allSprints = sprints;
      
      // Now fetch tasks for each sprint
      let completedRequests = 0;
      const totalSprints = sprints.length;
      
      if (totalSprints === 0) {
        console.log('No sprints found');
        return;
      }
      
      sprints.forEach((sprint: any) => {
        // Check for different possible ID field names
        const sprintId = sprint.id || sprint.sprintId || sprint._id || sprint.sprint_id;
        
        if (!sprintId) {
          console.error('Sprint ID is undefined for sprint:', sprint);
          completedRequests++;
          if (completedRequests === totalSprints) {
            console.log('All sprints with tasks loaded:', this.allSprints);
          }
          return;
        }
        
        console.log('Fetching tasks for sprint ID:', sprintId); // Debug
        
        this.sprintService.getTaskBySprintId(sprintId).subscribe({
          next: (tasks: any) => {
            sprint.taskList = tasks || [];
            completedRequests++;
            
            // Check if all requests are completed
            if (completedRequests === totalSprints) {
              console.log('All sprints with tasks loaded:', this.allSprints);
              // You can call any callback function here if needed
            }
          },
          error: (error: any) => {
            console.error(`Error fetching tasks for sprint ${sprint.id}:`, error);
            sprint.taskList = [];
            completedRequests++;
            
            // Check if all requests are completed (including failed ones)
            if (completedRequests === totalSprints) {
              console.log('All sprints with tasks loaded:', this.allSprints);
            }
          }
        });
      });
    },
    error: (error: any) => {
      console.error('Error fetching sprints:', error);
      this.allSprints = [];
    }
  });
}

submitSprint() {
    console.log('Sprint Form Value:', this.sprintForm.value);
    this.sprintService.createSprint(this.sprintForm.value).subscribe({
      next: (data:any) => {
        console.log('Sprint created successfully:');
      },error: (error) => {
        console.error('Error creating sprint:', error);
      }
    })
     this.getAllSprints(); // Refresh the list of sprints
      this.sprintForm.reset(); // Reset the form after submission
      this.isTaskModalOpen = false; // Close the modal
  }
    
}