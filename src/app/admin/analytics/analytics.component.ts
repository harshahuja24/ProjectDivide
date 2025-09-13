import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {

  ngOnInit(){

    this.getEmployeesAndTasks();
  }
  public loggedInUserId: number = Number(localStorage.getItem('loggedInUserId'));
  

  constructor(public employeeService: EmployeeService, public taskService: TaskService){
  }

  public taskStatusChartData: { name: string, value: number }[] = [];
  public tasksPerEmployeeChartData: { name: string, value: number }[] = [];
  public taskDurationsChartData: { name: string, value: number, assignedTo: string }[] = [];
  public tasksPerDateChartData: { name: string, series: { name: string, value: number }[] }[] = [];


  getEmployeesAndTasks() {
    this.employeeService.getAllEmployees().subscribe((employees: any[]) => {
      this.taskService.getAllTasks().subscribe((tasks: any[]) => {
        const combinedData = this.combineTasksWithEmployees(tasks, employees);
        this.prepareChartData(combinedData);
      });
    });
  }

  private combineTasksWithEmployees(tasks: any[], employees: any[]): any[] {
    return tasks
      .filter(task => task.assignedFrom === this.loggedInUserId)
      .map(task => {
        const employee = employees.find(emp => emp.eid === task.assignedTo);
        return {
          ...task,
          assignedToName: employee ? employee.ename : 'Unknown'
        };
      });
  }

  private prepareChartData(combinedData: any[]) {
    this.prepareTaskStatusChartData(combinedData);
    this.prepareTasksPerEmployeeChartData(combinedData);
    this.prepareTaskDurationsChartData(combinedData);
    this.prepareTasksPerDateChartData(combinedData);

    console.log('Task Status Chart Data:', this.taskStatusChartData);
    console.log('Tasks Per Employee Chart Data:', this.tasksPerEmployeeChartData);
    console.log('Task Durations Chart Data:', this.taskDurationsChartData);
    console.log('Tasks Per Date Chart Data:', this.tasksPerDateChartData);
  }

  private prepareTaskStatusChartData(combinedData: any[]) {
    const taskStatusCounts = { TODO: 0, IN_PROGRESS: 0, COMPLETED: 0 };
    combinedData.forEach(task => {
      if (task.taskStatus === 'TODO') taskStatusCounts.TODO++;
      else if (task.taskStatus === 'IN_PROGRESS') taskStatusCounts.IN_PROGRESS++;
      else if (task.taskStatus === 'COMPLETED') taskStatusCounts.COMPLETED++;
    });
    this.taskStatusChartData = [
      { name: 'To Do', value: taskStatusCounts.TODO },
      { name: 'In Progress', value: taskStatusCounts.IN_PROGRESS },
      { name: 'Completed', value: taskStatusCounts.COMPLETED }
    ];
  }

  private prepareTasksPerEmployeeChartData(combinedData: any[]) {
    const tasksByEmployee: { [key: string]: any[] } = {};
    combinedData.forEach(task => {
      if (!tasksByEmployee[task.assignedToName]) {
        tasksByEmployee[task.assignedToName] = [];
      }
      tasksByEmployee[task.assignedToName].push(task);
    });
    this.tasksPerEmployeeChartData = Object.keys(tasksByEmployee).map(empName => ({
      name: empName,
      value: tasksByEmployee[empName].length
    }));
  }

  private prepareTaskDurationsChartData(combinedData: any[]) {
    this.taskDurationsChartData = combinedData
      .filter(task => task.startedAt && task.completedAt)
      .map(task => ({
        name: task.taskTitle,
        value: (new Date(task.completedAt).getTime() - new Date(task.startedAt).getTime()) / (1000 * 1440), // duration in minutes
        assignedTo: task.assignedToName
      }));
  }

  private prepareTasksPerDateChartData(combinedData: any[]) {
    const tasksByEmployeeAndDate: { [employee: string]: { [date: string]: number } } = {};
    combinedData.forEach(task => {
      const employee = task.assignedToName;
      // Use startedAt or createdAt as the date
      const date = (task.startedAt) ? new Date(task.createdAt).toISOString().split('T')[0] : 'Unknown';
      if (!tasksByEmployeeAndDate[employee]) tasksByEmployeeAndDate[employee] = {};
      if (!tasksByEmployeeAndDate[employee][date]) tasksByEmployeeAndDate[employee][date] = 0;
      tasksByEmployeeAndDate[employee][date]++;
    });

    this.tasksPerDateChartData = Object.keys(tasksByEmployeeAndDate).map(employee => ({
      name: employee,
      series: Object.keys(tasksByEmployeeAndDate[employee]).map(date => ({
        name: date,
        value: tasksByEmployeeAndDate[employee][date]
      }))
    }));
  }
}
