import { Component } from '@angular/core';

interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done';
  priority: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
  type: 'Story' | 'Task' | 'Bug' | 'Epic';
}

interface Project {
  id: string;
  name: string;
  key: string;
  color: string;
  isExpanded: boolean;
  tasks: Task[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  projects: Project[] = [
    {
      id: '1',
      name: 'Website Redesign',
      key: 'WR',
      color: '#4BADE8',
      isExpanded: true,
      tasks: [
        {
          id: 'WR-1',
          title: 'Write content for main pages',
          assignee: 'Antonio',
          dueDate: 'October 8th, 2024',
          status: 'In Review',
          priority: 'High',
          type: 'Task'
        },
        {
          id: 'WR-2',
          title: 'Design homepage mockup',
          assignee: 'Sarah',
          dueDate: 'October 15th, 2024',
          status: 'In Progress',
          priority: 'Highest',
          type: 'Story'
        },{
          id: 'WR-1',
          title: 'Write content for main pages',
          assignee: 'Antonio',
          dueDate: 'October 8th, 2024',
          status: 'In Review',
          priority: 'High',
          type: 'Task'
        },
        {
          id: 'WR-1',
          title: 'Write content for main pages',
          assignee: 'Antonio',
          dueDate: 'October 8th, 2024',
          status: 'In Review',
          priority: 'High',
          type: 'Task'
        },
        {
          id: 'WR-1',
          title: 'Write content for main pages',
          assignee: 'Antonio',
          dueDate: 'October 8th, 2024',
          status: 'In Review',
          priority: 'High',
          type: 'Task'
        },
      ]
    },
    {
      id: '2',
      name: 'Mobile App Development',
      key: 'MAD',
      color: '#65BA43',
      isExpanded: true,
      tasks: [
        {
          id: 'MAD-1',
          title: 'Fix login screen crash',
          assignee: 'John',
          dueDate: 'October 5th, 2024',
          status: 'In Progress',
          priority: 'Highest',
          type: 'Bug'
        },
        {
          id: 'MAD-2',
          title: 'Implement push notifications',
          assignee: 'Lisa',
          dueDate: 'October 12th, 2024',
          status: 'To Do',
          priority: 'Medium',
          type: 'Story'
        }
      ]
    }
  ];

  toggleProject(project: Project) {
    project.isExpanded = !project.isExpanded;
  }

  getStatusColor(status: 'To Do' | 'In Progress' | 'In Review' | 'Done'): string {
    const colors = {
      'To Do': '#DFE1E6',
      'In Progress': '#0052CC',
      'In Review': '#00B8D9',
      'Done': '#36B37E'
    };
    return colors[status];
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'Highest': return '↑↑';
      case 'High': return '↑';
      case 'Medium': return '→';
      case 'Low': return '↓';
      case 'Lowest': return '↓↓';
      default: return '→';
    }
  }

  getTypeIcon(type: 'Story' | 'Task' | 'Bug' | 'Epic'): string {
    const icons = {
      'Story': '📋',
      'Task': '✔️',
      'Bug': '🐞',
      'Epic': '⚡'
    };
    return icons[type] || '✔️';
  }
}