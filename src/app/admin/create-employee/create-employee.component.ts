import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

  isEmployeeModalOpen = false;

  employeeRegistration=new FormGroup({
    ename:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    isAdmin:new FormControl('',[Validators.required]),
  })

  employeeSubmit(){
    console.log(this.employeeRegistration.value)
  }
  
}