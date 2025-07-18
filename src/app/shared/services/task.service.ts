import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient:HttpClient) {} 

  getAllBacklogTasks() {
    return this.httpClient.get('http://localhost:8080/tasks/backlog');
  }

  createTask(taskData: any) {
    return this.httpClient.post('http://localhost:8080/tasks/create', taskData);
  }

  getTaskBySprintId(sprintId: string) {
    return this.httpClient.get(`http://localhost:8080/tasks/bySprintId/${sprintId}`);
  }

  getActiveSprintTasksByEmployee(employeeId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8080/tasks/active-sprint/employee/${employeeId}`);
  }

  getTasksByEmployeeId(employeeId: number): Observable<any> {
  return this.httpClient.get(`http://localhost:8080/tasks/employee/${employeeId}`);
}
  updateTaskStatus(task:any){
    return this.httpClient.put("http://localhost:8080/tasks/updateStatus", task);
  }

}
