import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { TaskService } from 'src/app/shared/services/task.service';

interface KanbanUser {
  id: string;
  name: string;
  initials: string;
  taskCount: string;
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
//   users: KanbanUser[] = [
//     {
//       id: 'SG',
//       name: 'Simran Gurdasani',
//       initials: 'SG',
//       taskCount: '(2 tasks)',
//       isExpanded: false,
//       tasks: {
//         todo: [
//           {
//             id: 'DES-102',
//             title: 'Review Documentation',
//             projectName: 'Design',
//             project: 'design',
//             points: 5
//           },
//           {
//             id: 'DEV-205',
//             title: 'Update User Interface',
//             projectName: 'Development',
//             project: 'development',
//             points: 8
//           }
//         ],
//         inProgress: [],
//         done: []
//       }
//     },
// ];

constructor(private employeeService:EmployeeService,private taskService:TaskService){}

  toggleExpand(user: KanbanUser): void {
    user.isExpanded = !user.isExpanded;
  }
  employees: any[] = []; // Initialize as an empty array
  isAdminFlag: boolean = false;
  adminId: number | null = null; // Initialize as null
  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data || []; // Ensure employees is defined
      this.employees.forEach(employee => {
        console.log('Employee:', employee);
        if (employee.isAdmin === true) {
          this.isAdminFlag = true;
          this.adminId = employee.eid;
          console.log('Admin ID:', this.adminId);
        }
      });
    });
  }

  
}