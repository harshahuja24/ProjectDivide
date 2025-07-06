import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private httpClient:HttpClient) { }


  getAllSprints():Observable<any> {
     return of([]);;
  }

  createSprint(sprintData: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/sprint/createSprint', sprintData);
}
}
