import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }


  createEmployee(body:any){
    return this.http.post("http://localhost:8080/employee/createEmployee",body);
  }

  viewAllEmployees(){
    return this.http.get("http://localhost:8080/employee/getAllEmployees")
  }

  getAllEmployees(): Observable<any> {
    return this.http.get("http://localhost:8080/employee/getAllEmployees");
  }
}
