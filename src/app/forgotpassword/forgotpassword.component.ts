import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  public forgotPasswordForm : FormGroup;

  constructor(private fb : FormBuilder) { 
    this.forgotPasswordForm = this.fb.group({
      email : ['' , Validators.compose([Validators.required, CustomValidators.email])],
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.forgotPasswordForm.valid){
      console.log(this.forgotPasswordForm);
      
    }
  }

}
