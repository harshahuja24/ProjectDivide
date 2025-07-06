import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) { }


  getAllSprints():Observable<any> {
     return this.http.get("http://localhost:8080/sprint/getAllSprints");
  }

  getTaskBySprintId(sprintId: string) {
   
    return this.http.get(`http://localhost:8080/tasks/bySprintId/${sprintId}`);
  }

  createSprint(sprintData: any): Observable<any> {
    return this.http.post('http://localhost:8080/sprint/createSprint', sprintData);
}
}
