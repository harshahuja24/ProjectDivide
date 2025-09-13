import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

  employeesList!:any
  isAdminFlag!:boolean

  ngOnInit(){
    this.viewAllEmployees()
  }

  constructor(private employeeService: EmployeeService){

  }

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
    let backendVal:any = {};
    backendVal = {
      "ename": this.employeeRegistration.value.ename,
      "isAdmin":this.employeeRegistration.value.isAdmin,
      "email": this.employeeRegistration.value.email
    }
  this.employeeService.createEmployee(backendVal).subscribe({
    next: (res: any) => {
    this.viewAllEmployees();
    },
    error: (err: any) => {
    // handle error, e.g., show an error message
    console.error('Error creating employee:', err);
    }
  });

  this.isEmployeeModalOpen = false;
    

  }
  

  viewAllEmployees(){
    this.employeeService.viewAllEmployees().subscribe((e:any)=>{
      console.log(e)
      // console.log(e['isAdmin'])
      // this.employeesList=e
      // if(e['isAdmin'] == true) {
      //   this.isAdminFlag = true
      // }

      // console.log(e[0].isAdmin);

      this.employeesList = e.map((employee: any) => {
        return {
          ename: employee.ename,
          isAdmin: employee.isAdmin,

        };
      });

      console.log(this.employeesList);
  });
    
  }

}