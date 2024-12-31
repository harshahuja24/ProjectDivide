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
  selector: 'app-view-all-kanban',
  templateUrl: './view-all-kanban.component.html',
  styleUrls: ['./view-all-kanban.component.css']
})
export class ViewAllKanbanComponent {
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
    {
      id: 'HA',
      name: 'Harsh Ahuja',
      initials: 'HA',
      issueCount: '(3 issues)',
      isExpanded: true,
      tasks: {
        todo: [
          {
            id: 'DES-101',
            title: 'Gather Changes and Updates',
            projectName: 'Design',
            project: 'design',
            points: 10
          }
        ],
        inProgress: [
          {
            id: 'DEV-103',
            title: 'Implement New Features',
            projectName: 'Development',
            project: 'development',
            points: 13
          }
        ],
        done: [
          {
            id: 'DES-100',
            title: 'Create Wireframes',
            projectName: 'Design',
            project: 'design',
            points: 8
          }
        ]
      }
    }
];

  toggleExpand(user: KanbanUser): void {
    user.isExpanded = !user.isExpanded;
  }
}