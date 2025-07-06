import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient:HttpClient) {} 

  getAllBacklogTasks() {
    return this.httpClient.get('http://localhost:8080/tasks/backlog');
  }
}
