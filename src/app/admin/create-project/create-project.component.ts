import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  isModalOpen:boolean = false

  projectRegistration=new FormGroup({
    ptitle:new FormControl('',[Validators.required]),
    teammember:new FormControl('',[Validators.required]),
    duedate:new FormControl('',[Validators.required]),
    pdesc:new FormControl('',[Validators.required]),
  })

  projectSubmit(){
    console.log(this.projectRegistration.value)
  }
}
