// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { TaskService } from '../services/task.service';
import { Route, Router } from '@angular/router';
import { local } from 'd3-selection';

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

interface Employee {
  eid: number;
  ename: string;
  isAdmin?: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  //can you refresh the page after login to see the dash board
  // Authentication properties
  loggedInUserId: number | null = localStorage.getItem('loggedInUserId') ? parseInt(localStorage.getItem('loggedInUserId')!, 10) : null;
  isLoggedIn: boolean = this.loggedInUserId !== null;
  loggedInEmployee: Employee | null = null;
  availableEmployees: Employee[] = [];
  isAdminFlag: boolean = false;
  adminId: number | null = null;
  showUserSelector: boolean = false;

  // Task properties
  userTasks: {
    todo: KanbanTask[];
    inProgress: KanbanTask[];
    done: KanbanTask[];
  } = {
    todo: [],
    inProgress: [],
    done: []
  };

  // Statistics
  taskStats = {
    total: 0,
    todo: 0,
    inProgress: 0,
    done: 0
  };

  // Loading state
  isLoading: boolean = true;

  constructor(
    private employeeService: EmployeeService, // Replace with your actual service
    private taskService: TaskService ,     // Replace with your actual service
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoggedInUser();
    this.getAllEmployees();
  }

  // Check if user is logged in via localStorage
  checkLoggedInUser() {
    const storedUserId = localStorage.getItem('loggedInUserId');
    if (storedUserId) {
      this.loggedInUserId = parseInt(storedUserId, 10);
      console.log('Logged in user ID from localStorage:', this.loggedInUserId);
      this.showUserSelector = false;
    } else {
      console.log('No logged in user found in localStorage');
      this.showUserSelector = true;
    }
  }

  // Get all employees
  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.availableEmployees = data || [];
        
        // Store all employees for user selection
        this.availableEmployees.forEach(employee => {
          if (employee.isAdmin === true) {
            this.isAdminFlag = true;
            this.adminId = employee.eid;
          }
        });

        // Filter data based on logged in user
        if (this.loggedInUserId) {
          this.filterEmployeeData();
        } else {
          this.isLoading = false;
        }
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
        this.isLoading = false;
      }
    );
  }

  // Filter employee data and load tasks
  filterEmployeeData() {
    if (!this.loggedInUserId || !this.availableEmployees.length) {
      this.isLoading = false;
      return;
    }

    // Find the logged in employee
    this.loggedInEmployee = this.availableEmployees.find(emp => emp.eid === this.loggedInUserId) || null;
    
    if (this.loggedInEmployee) {
      this.loadUserTasks();
    } else {
      console.error('Logged in employee not found');
      this.isLoading = false;
    }
  }

  // Load tasks for the logged-in user
  loadUserTasks() {
    if (!this.loggedInUserId) {
      this.isLoading = false;
      return;
    }

    // Call your task service to get tasks assigned to the logged-in user
    this.taskService.getTasksByEmployeeId(this.loggedInUserId).subscribe((tasks: KanbanTask[]) => {
      this.categorizeUserTasks(tasks);
      this.calculateTaskStats();
      this.isLoading = false;
    }, error => {
      console.error('Error fetching user tasks:', error);
      this.isLoading = false;
    });
  }

  // Categorize tasks by status
  categorizeUserTasks(tasks: KanbanTask[]) {
    this.userTasks = {
      todo: tasks.filter(task => task.taskStatus.toLowerCase() === 'todo'),
      inProgress: tasks.filter(task => task.taskStatus.toLowerCase() === 'inprogress' || task.taskStatus.toLowerCase() === 'in progress'),
      done: tasks.filter(task => task.taskStatus.toLowerCase() === 'done' || task.taskStatus.toLowerCase() === 'completed')
    };
  }

  // Calculate task statistics
  calculateTaskStats() {
    this.taskStats = {
      todo: this.userTasks.todo.length,
      inProgress: this.userTasks.inProgress.length,
      done: this.userTasks.done.length,
      total: this.userTasks.todo.length + this.userTasks.inProgress.length + this.userTasks.done.length
    };
  }

  // Select user for login
  selectUser(employee: Employee) {
    this.loggedInUserId = employee.eid;
    this.loggedInEmployee = employee;
    localStorage.setItem('loggedInUserId', employee.eid.toString());
    
    this.showUserSelector = false;
    this.isLoading = true;
    this.loadUserTasks();
  }

  // Get user initials for display
  getUserInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  // Get employee name by ID
  getEmployeeName(eid: number): string {
    const employee = this.availableEmployees.find(emp => emp.eid === eid);
    return employee ? employee.ename : 'Unknown';
  }

  // Get user role
  getUserRole(): string {
    return this.loggedInEmployee?.isAdmin ? 'Administrator' : 'Employee';
  }

  // Format task ID for display
  formatTaskId(taskId: number): string {
    return `TASK-${taskId.toString().padStart(3, '0')}`;
  }

  // Format task status for display
  formatTaskStatus(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  // Get status class for styling
  getStatusClass(status: string): string {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'todo') return 'status-todo';
    if (normalizedStatus === 'inprogress' || normalizedStatus === 'in progress') return 'status-inprogress';
    if (normalizedStatus === 'done' || normalizedStatus === 'completed') return 'status-done';
    return 'status-todo';
  }

  // Format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit' 
    });
  }

  // Logout function
  logout() {
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
    localStorage.clear();
              

    // localStorage.removeItem('loggedInUserId');
    // this.loggedInUserId = null;
    // this.loggedInEmployee = null;
    // this.userTasks = { todo: [], inProgress: [], done: [] };
    // this.taskStats = { total: 0, todo: 0, inProgress: 0, done: 0 };
    // this.showUserSelector = true;
  }

  // Refresh tasks
  refreshTasks() {
    if (this.loggedInUserId) {
      this.isLoading = true;
      this.loadUserTasks();
    }
  }

  // Check if user has any tasks
  hasAnyTasks(): boolean {
    return this.taskStats.total > 0;
  }
}