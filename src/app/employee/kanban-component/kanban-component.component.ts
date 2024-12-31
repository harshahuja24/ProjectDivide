import { Component } from '@angular/core';

interface KanbanUser {
  id: string;
  name: string;
  initials: string;
  issueCount: string;
  isExpanded: boolean;
  tasks: {
    todo: KanbanTask[];
    inProgress: KanbanTask[];
    done: KanbanTask[];
  };
}

interface KanbanTask {
  id: string;
  title: string;
  projectName: string;
  project: 'design' | 'development';  // for styling
  points?: number;
}

@Component({
  selector: 'kanban-component',
  templateUrl: './kanban-component.component.html',
  styleUrls: ['./kanban-component.component.css']
})

export class KanbanComponent {
  users: KanbanUser[] = [
    {
      id: 'SG',
      name: 'Simran Gurdasani',
      initials: 'SG',
      issueCount: '(2 issues)',
      isExpanded: false,
      tasks: {
        todo: [
          {
            id: 'DES-102',
            title: 'Review Documentation',
            projectName: 'Design',
            project: 'design',
            points: 5
          },
          {
            id: 'DEV-205',
            title: 'Update User Interface',
            projectName: 'Development',
            project: 'development',
            points: 8
          }
        ],
        inProgress: [],
        done: []
      }
    },
];

  toggleExpand(user: KanbanUser): void {
    user.isExpanded = !user.isExpanded;
  }
}