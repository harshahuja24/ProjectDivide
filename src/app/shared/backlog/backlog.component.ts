// backlog.component.ts
import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { SprintService } from '../services/sprint.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Add these imports at the top of your component file
import { forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TaskService } from '../services/task.service';

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
  activeYN!:boolean;
  isAdminFlag!:boolean;
isSprintModalOpen=false;
adminId!:number;
  isTaskModalOpen=false;
  employees: any[] = []; // Initialize as an empty array

  constructor(private employeeService:EmployeeService, private sprintService:SprintService,private taskService:TaskService ){}

  sprintForm=new FormGroup({ 
    sprintTitle:new FormControl(''),
    startDate:new FormControl(''),
    endDate:new FormControl(''),
    sprintDesc:new FormControl('')
  });

  // Removed duplicate ngOnInit()


sprintExpanded: boolean[] = [];

  // Add this method to toggle sprint expansion
  toggleSprint(index: number): void {
    this.sprintExpanded[index] = !this.sprintExpanded[index];
  }
innerHTML="";
  activeSprint = {
    name: 'SCRUM Sprint 2',
    dateRange: '5 Dec - 12 Dec',
    tasks: '2 tasks',
    estimate: 10
  };

   ngOnInit() {
     this.getAllSprints();
     this.sprintExpanded = new Array(this.allSprints.length).fill(false);
     console.log(this.getAllEmployees())
     this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        console.log('Fetched employees:', data);
        this.employees = data || []; // Ensure employees is defined
        this.employees.forEach(employee => {
          console.log('Employee:', employee);
          if(employee['isAdmin'] === true) {
            this.isAdminFlag = true;
            this.adminId=employee['eid']
            console.log('Admin ID:', this.adminId);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
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

  startSprint(sprintId:any ) {
    console.log('Starting sprint with ID:', sprintId);
    this.sprintService.startSprint(sprintId).subscribe(()=> console.log('Sprint started successfully'));
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
      console.log('Raw sprints data:', sprints);
      
      if (!sprints || sprints.length === 0) {
        console.log('No sprints found');
        this.allSprints = [];
        return;
      }

      // Initialize each sprint with empty taskList
      sprints.forEach((sprint: any) => {
        sprint.taskList = [];
      });

      // Use forkJoin to fetch all tasks concurrently
      const taskObservables = sprints.map((sprint: any) => {
        const sprintId = sprint.id || sprint.sprintId || sprint._id || sprint.sprint_id;
        
        if (!sprintId) {
          console.error('Sprint ID is undefined for sprint:', sprint);
          return of(sprint); // Return sprint as-is if no ID
        }

        console.log('Fetching tasks for sprint ID:', sprintId);
        return this.sprintService.getTaskBySprintId(sprintId).pipe(
          map((tasks: any) => {
            sprint.taskList = tasks || [];
            return sprint;
          }),
          catchError((error: any) => {
            console.error(`Error fetching tasks for sprint ${sprintId}:`, error);
            sprint.taskList = [];
            return of(sprint); // Return sprint with empty taskList on error
          })
        );
      });

      // Wait for all task requests to complete
      forkJoin(taskObservables).subscribe({
        next: (sprintsWithTasks: any[]) => {
          this.allSprints = sprintsWithTasks;
          console.log('All sprints with tasks loaded:', this.allSprints);
        },
        error: (error: any) => {
          console.error('Error in forkJoin:', error);
          this.allSprints = sprints; // At least set sprints without tasks
        }
      });
    },
    error: (error: any) => {
      console.error('Error fetching sprints:', error);
      this.allSprints = [];
    }
  });
}

// async submitSprint() {
//   console.log('Sprint Form Value:', this.sprintForm.value);
  
//   try {
//     await this.sprintService.createSprint(this.sprintForm.value).subscribe(()=>{
//       console.log('Response received, proceeding with cleanup...');
//         this.sprintForm.reset();
//         this.isTaskModalOpen = false;
       
//         console.log('All cleanup completed');
//          this.getAllSprints();
//     });
      
//   } catch (error) {
//     console.error('Unexpected error in submitSprint:', error);
//     this.isTaskModalOpen = false;
//      await this.getAllSprints();
//   }

//    await this.getAllSprints();
// }

 submitSprint() {
    console.log('Sprint Form Value:', this.sprintForm.value);
     this.sprintService.createSprint(this.sprintForm.value).subscribe({
      next: (response) => {
        console.log('Sprint created successfully:', response);
        this.sprintForm.reset(); // Reset the form after submission
        this.isTaskModalOpen = false; // Close the modal
        this.getAllSprints(); // Refresh the list of sprints
        this.sprintExpanded = new Array(this.allSprints.length).fill(false);
      },
      error: (error) => {
        console.error('Error creating sprint:', error);
      }
    })
  }


  
  
    createTaskForm = new FormGroup({
      taskName: new FormControl('',[Validators.required]),
      taskDescription: new FormControl('',[Validators.required]),
      taskDeadline: new FormControl('',[Validators.required]),
      taskAssignedTo: new FormControl('',[Validators.required]),
      taskStatus: new FormControl('',[Validators.required]),
      sprintId: new FormControl(0,[Validators.required])
    });


    createTask(sprintId: number) {
    console.log('Creating task for sprint ID:', sprintId);
    this.isTaskModalOpen = true; // Open the task creation modal
    this.createTaskForm.reset(); // Reset the form for new task creation
    this.createTaskForm.patchValue({ sprintId: sprintId }); // Set the sprintId in the form
    console.log('Task creation form initialized with sprintId:', this.createTaskForm.value.sprintId);
  }

  
    submitTask(){
      console.log(this.createTaskForm.value);
      
      let body = {
        taskTitle: this.createTaskForm.value.taskName,
        taskDesc: this.createTaskForm.value.taskDescription,
        assignedTo: Number( this.createTaskForm.value.taskAssignedTo),
        taskStatus: this.createTaskForm.value.taskStatus,
        sprintId: this.createTaskForm.value.sprintId,
        activeYN: true,
        assignedFrom: this.adminId // Assuming adminId is the ID of the user creating the task
    }
    console.log('Submitting task with body:', body),
    this.taskService.createTask(body).subscribe({
      next: (response:any) => {
        console.log('Task created successfully:', response);
        this.createTaskForm.reset(); // Reset the form after submission
        this.isTaskModalOpen = false; // Close the modal
        this.getAllSprints(); // Refresh the list of sprints
      },
      error: (error:any) => {
        console.error('Error creating task:', error);
      }
    });
  }

}