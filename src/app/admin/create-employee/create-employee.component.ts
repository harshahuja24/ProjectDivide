import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  isAdmin: boolean;
}
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent {
  isEmployeeModalOpen = false;
  employees: Employee[] = [];
  newEmployee: Employee = {
    id: 1,
    name: '',
    email: '',
    phone: '',
    address: '',
    isAdmin: false
  };

  addEmployee(): void {
    const employee = { ...this.newEmployee, id: Date.now() };
    this.employees.push(employee);
    this.resetEmployeeForm();
    this.isEmployeeModalOpen = false;
  }

  resetEmployeeForm(): void {
    this.newEmployee = {
      id: 1,
      name: '',
      email: '',
      phone: '',
      address: '',
      isAdmin: false
    };
  }

  removeEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }
}
