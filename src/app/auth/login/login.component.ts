import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  });

  constructor(private employeeService: EmployeeService,private router:Router) {}

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe((employees: any[]) => {
      console.log('Fetched employees on init:', employees);
      employees.forEach(emp => console.log(emp.password));

    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.validateUserFromBackend(this.loginForm.value);
  }

  validateUserFromBackend(formData: any) {
    this.employeeService.getAllEmployees().subscribe((employees: any[]) => {
      console.log('Fetched employees:', employees);
      const user = employees.find(emp => emp.email === formData.email && emp.password === formData.password);
      if (user) {
        console.log('Login successful:', user);
        localStorage.setItem('loggedInUserId', JSON.stringify(user.eid));
        localStorage.setItem('isAdmin', JSON.stringify(user.isAdmin));
        // Redirect to dashboard or another page
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        });

      } else {
        console.log('Invalid email or password');
      }

  })

}


  forgotPassword() {
    console.log('Forgot password clicked');
  }

}
