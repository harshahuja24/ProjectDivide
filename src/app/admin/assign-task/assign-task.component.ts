import { Component } from '@angular/core';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})


export class AssignTaskComponent {
  
  tasks: any[]= [
    {
      id: 1,
      name: 'Conduct usability testing',
      project: 'Mobile App Development',
      assignee: 'John',
      dueDate: 'October 15th, 2024',
      status: 'Backlog'
    },
    {
      id: 2,
      name: 'Integrate push notifications',
      project: 'Mobile App Development',
      assignee: 'John',
      dueDate: 'October 13th, 2024',
      status: 'Backlog'
    },
    {
      id: 3,
      name: 'Develop login screen',
      project: 'Mobile App Development',
      assignee: 'Antonio',
      dueDate: 'October 12th, 2024',
      status: 'In Review'
    },
    {
      id: 4,
      name: 'Implement navigation flow',
      project: 'Mobile App Development',
      assignee: 'John',
      dueDate: 'October 11th, 2024',
      status: 'Todo'
    },
    {
      id: 5,
      name: 'Design UI components',
      project: 'Mobile App Development',
      assignee: 'Antonio',
      dueDate: 'October 10th, 2024',
      status: 'In Progress'
    },
    {
      id: 6,
      name: 'Create app wireframes',
      project: 'Mobile App Development',
      assignee: 'John',
      dueDate: 'October 9th, 2024',
      status: 'Done'
    }
  ];

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'Backlog': 'status-backlog',
      'Todo': 'status-todo',
      'In Progress': 'status-in-progress',
      'In Review': 'status-in-review',
      'Done': 'status-done'
    };
    return colors[status] || 'status-default';
  }

  addNewTask(): void {
    // Implement new task logic
    console.log('Adding new task');
  }

  ngOnInit(): void {
  }
}
