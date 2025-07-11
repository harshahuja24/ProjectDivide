import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { TaskService } from 'src/app/shared/services/task.service';

// Updated interfaces to match your actual data structure
interface KanbanUser {
  eid: number;
  ename: string;
  isAdmin?: boolean;
  isExpanded: boolean;
  tasks: {
    todo: KanbanTask[];
    inProgress: KanbanTask[];
    done: KanbanTask[];
  };
}

interface KanbanTask {
  taskId: number;
  taskTitle: string;
  taskDesc: string;
  taskStatus: string;
  activeYN: boolean;
  assignedFrom: number;
  assignedTo: number;
  createdAt: string;
  sprintId: number;
}

@Component({
  selector: 'kanban-component',
  templateUrl: './kanban-component.component.html',
  styleUrls: ['./kanban-component.component.css']
})
export class KanbanComponent implements OnInit {
  
  constructor(private employeeService: EmployeeService, private taskService: TaskService) {}

  employees: any[] = [];
  loggedInEmployee: any = null;
  loggedInUserId: number | null = null;
  isAdminFlag: boolean = false;
  adminId: number | null = null;
  
  // For demonstration - you can remove this in production
  availableEmployees: any[] = [];
  showUserSelector: boolean = false;

  ngOnInit() {
    this.checkLoggedInUser();
    this.getAllEmployees();
  }

  

  // Check if user is logged in via localStorage
  checkLoggedInUser() {
    const storedUserId = localStorage.getItem('loggedInUserId');
    if (storedUserId) {
      this.loggedInUserId = parseInt(storedUserId, 10);
      console.log('Logged in user ID from localStorage:', this.loggedInUserId);
    } else {
      console.log('No logged in user found in localStorage');
      // Show user selector for demonstration
      this.showUserSelector = true;
    }
  }

  // Set logged in user (for demonstration purposes)
  setLoggedInUser(employeeId: number) {
    this.loggedInUserId = employeeId;
    localStorage.setItem('loggedInUserId', employeeId.toString());
    console.log('Logged in user set:', employeeId);
    this.showUserSelector = false;
    this.filterEmployeeData();
  }

  // Logout user
  logout() {
    localStorage.removeItem('loggedInUserId');
    this.loggedInUserId = null;
    this.loggedInEmployee = null;
    this.employees = [];
    this.showUserSelector = true;
    console.log('User logged out');
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((data: any) => {
      this.availableEmployees = data || [];
      
      // Store all employees for user selection
      this.availableEmployees.forEach(employee => {
        if (employee.isAdmin === true) {
          this.isAdminFlag = true;
          this.adminId = employee.eid;
        }
      });

      // Filter data based on logged in user
      this.filterEmployeeData();
    });
  }

  filterEmployeeData() {
    if (!this.loggedInUserId || !this.availableEmployees.length) {
      return;
    }

    // Find the logged in employee
    this.loggedInEmployee = this.availableEmployees.find(emp => emp.eid === this.loggedInUserId);
    
    if (this.loggedInEmployee) {
      // Only show the logged in employee in the kanban board
      this.employees = [this.loggedInEmployee];
      
      // Add kanban-specific properties
      this.employees.forEach(employee => {
        employee.isExpanded = false;
        employee.tasks = {
          todo: [],
          inProgress: [],
          done: []
        };
      });

      // Load tasks for the logged in user
      this.loadUserTasks();
    }
  }

  loadUserTasks() {
    if (!this.loggedInUserId) return;

    // Load tasks for the logged in user
    this.taskService.getTasksByEmployeeId(this.loggedInUserId).subscribe((tasks: any) => {
      if (tasks && this.loggedInEmployee) {
        console.log('Tasks for logged in employee:', this.loggedInEmployee.ename, tasks);
        // Organize tasks by status
        const todoTasks = tasks.filter((task: any) => task.taskStatus === 'TODO' || task.taskStatus === 'todo');
        const inProgressTasks = tasks.filter((task: any) => task.taskStatus === 'IN PROGRESS');
        const doneTasks = tasks.filter((task: any) => task.taskStatus === 'DONE');
        
        // Update the employee's tasks
        this.employees[0].tasks = {
          todo: todoTasks,
          inProgress: inProgressTasks,
          done: doneTasks
        };

        console.log(this.employees[0].tasks);
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
  }

  toggleExpand(user: any): void {
    user.isExpanded = !user.isExpanded;
  }

  // Helper method to get total task count
  getTotalTaskCount(employee: any): number {
    if (!employee.tasks) return 0;
    return employee.tasks.todo.length + employee.tasks.inProgress.length + employee.tasks.done.length;
  }
}