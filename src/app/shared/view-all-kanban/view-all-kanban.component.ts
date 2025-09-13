import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { TaskService } from '../services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface KanbanEmployee {
  id: string;
  name: string;
  isExpanded: boolean;
  tasks: {
    todo: KanbanTask[];
    inProgress: KanbanTask[];
    done: KanbanTask[];
  };
}

interface KanbanTask {
  taskId: string;      // taskId from TaskDTO
  title: string;   // taskTitle from TaskDTO
  desc: string;    // taskDesc from TaskDTO (optional, if you want to display description)
  createdAt: string;
  taskStatus: string; // LocalDateTime as string, if you want to display it
  // add more fields if needed from TaskDTO
}

@Component({
  selector: 'app-view-all-kanban',
  templateUrl: './view-all-kanban.component.html',
  styleUrls: ['./view-all-kanban.component.css']
})
export class ViewAllKanbanComponent implements OnInit {
  employees: any[] = [];
  kanbanEmployees: KanbanEmployee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.getAllEmployeesAndTasks();
  }

  drop(event: CdkDragDrop<any[]>, status: string) {

   
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    console.log('Drop event:', event);
    console.log('Previous Container:', event.previousContainer);
    console.log('Current Container:', event.container);
    console.log("status",status);

    event.container.data[0].taskStatus = status;

    this.taskService.updateTaskStatus(event.container.data[0]).subscribe(()=>{
      console.log("Task status updated successfully");
    });
    console.log('Updated task status:', event.container.data[0].taskStatus);
    console.log('Updated task:', event.container.data[0]);
    console.log("Task Updated Successfully");


  }

  getAllEmployeesAndTasks() {
    this.employeeService.getAllEmployees().subscribe((data: any[]) => {
      this.employees = data || [];
      console.log('Fetched employees:', this.employees);
      this.kanbanEmployees = [];
      this.employees.forEach(emp => {
        this.taskService.getActiveSprintTasksByEmployee(emp.eid).subscribe((tasks: any[]) => {
          console.log('Tasks for employee:', emp.ename, tasks);
          const kanbanEmployee: KanbanEmployee = {
            id: emp.eid.toString(),
            name: emp.ename,
            isExpanded: false,
            tasks: {
              todo: [],
              inProgress: [],
              done: []
            }
          };

          tasks.forEach(task => {
            const status = task.taskStatus ;
            const kanbanTask: KanbanTask = {
              taskId: task.taskId, // always use taskId
              title: task.taskTitle,
              desc: task.taskDesc,
              createdAt: task.createdAt,
              taskStatus: task.taskStatus // you may want to format this for display
            };
            console.log("Task Status:", status);
            if (status === "TODO" || status === "todo") kanbanEmployee.tasks.todo.push(kanbanTask);
            else if (status === 'in progress' || status === "IN PROGRESS") kanbanEmployee.tasks.inProgress.push(kanbanTask);
            else if (status === 'done' || status === "DONE") kanbanEmployee.tasks.done.push(kanbanTask);
          });

          this.kanbanEmployees.push(kanbanEmployee);
        });
      });
    });
  }

  toggleExpand(employee: KanbanEmployee): void {
    employee.isExpanded = !employee.isExpanded;
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  // drop(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }
}
